import Post from '../schemas/Posts';
import User from '../schemas/User';
import sharp from 'sharp';
import { resolve } from 'path';
import fs from 'fs';

class PostController {
  async feed(req, res) {
    const post = await Post.find().sort('-createdAt');

    return res.json(post);
  }

  async store(req, res) {
    const { description } = req.body;
    const { filename: image } = req.file;

    const [name, extType] = image.split('.');

    if (extType !== 'jpg' && extType !== 'jpeg' && extType !== 'png') {
      fs.unlinkSync(req.file.path);
      return res.status(401).json({ error: 'Extension not supported' });
    }

    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(resolve(req.file.destination, '..', 'posts', fileName));

    fs.unlinkSync(req.file.path);

    const newPost = await Post.create({
      user_id: req.userID,
      fileName,
      description,
      likes: 0,
      comentaries: [],
    });

    await User.findByIdAndUpdate(req.userID, { $push: { posts: newPost } });

    return res.json(newPost);
  }

  async likeStore(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    res.json(post);
  }
}

export default new PostController();

import Post from '../schemas/Posts';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

class PostController {
  async feed(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
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
      .toFile(path.resolve(req.file.destination, '..', 'posts', fileName));

    fs.unlinkSync(req.file.path);

    const newPost = await Post.create({
      user_id: req.userID,
      fileName,
      description,
      likes: 0,
      comentaries: [],
    });

    return res.json(newPost);
  }
}

export default new PostController();

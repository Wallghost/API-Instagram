import Post from '../schemas/Posts';
import sharp from 'sharp';
import { resolve } from 'path';
import fs from 'fs';

class PostController {
  async feed(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  }

  async store(req, res) {
    const { description } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    // console.log(resolve(req.file.destination, 'posts', req.file.filename));

    try {
      await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(resolve(req.file.destination, 'posts', fileName));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error });
    }

    fs.unlinkSync(req.file.path);

    return res.json({ image, description });
  }
}

export default new PostController();

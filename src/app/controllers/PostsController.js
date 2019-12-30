import Post from '../schemas/Posts'

class PostController {
  async feed(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  }
}

export default new PostController();

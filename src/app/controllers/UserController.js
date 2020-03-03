import User from '../schemas/User';
import Post from '../schemas/Posts';

class UserController {
  async userProfile(req, res) {
    try {
      const user = await User.findById(req.userID);
      const posts = await Post.find({ user_id: req.userID });

      const { avatar, name, username, email } = user;

      const postsCount = await Post.find({
        user_id: req.userID,
      }).countDocuments();

      return res.json({
        avatar,
        name,
        username,
        email,
        postsCount,
        followers: user.followers.length,
        following: user.following.length,
        posts: posts,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name, username, email, password } = req.body;

      const userCheck = await User.findOne({ username });

      if (userCheck)
        return res.status(401).json({ error: 'User already exists' });

      const newUser = await User.create({
        avatar: '',
        name,
        username,
        email,
        password,
      });

      return res.status(201).json({ newUser });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const user_id = req.userID;

      const { username, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(401).json({ error: 'Passwords does not match' });
      }

      const checkUsername = await User.findOne({ username });

      if (checkUsername) {
        return res
          .status(401)
          .json({ error: 'Username is already being used ' });
      }

      const user = await User.findByIdAndUpdate(
        user_id,
        { username },
        { new: true }
      );

      if (password) {
        user.password = password;
        await user.save();
      }

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();

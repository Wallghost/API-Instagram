import User from '../schemas/User';
import { resolve } from 'path';

class AvatarController {
  async store(req, res) {
    const { filename: path } = req.file;

    const user_id = req.userID;

    const profileAvatar = await User.findByIdAndUpdate(
      user_id,
      { avatar: resolve(__dirname, '..', 'tmp', 'uploads', 'avatar', path) },
      { new: true }
    );

    return res.json(profileAvatar);
  }
}

export default new AvatarController();

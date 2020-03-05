import User from '../schemas/User';

class FollowController {
  async follow(req, res) {
    const user = await User.findById(req.params.id);

    if (user.followers.indexOf(req.userID) !== -1) {
      return res
        .status(401)
        .json({ error: `You're already following ${user.username}` });
    }

    user.followers.push(req.userID);
    await user.save();

    const loggedUser = await User.findById(req.userID);
    loggedUser.following.push(user.id);
    await loggedUser.save();

    return res.json(loggedUser);
  }
}

export default new FollowController();

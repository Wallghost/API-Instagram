import User from '../schemas/User'

class UserController {
  async create (req, res){
  try {
    const { name, username, email, password } = req.body;

    const newUser = await User.create({
      name,
      username,
      email,
      password
    });

    return res.status(201).json({ newUser });

  } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export default new UserController();

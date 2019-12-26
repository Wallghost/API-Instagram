import User from '../schemas/User'

class AuthController {
  async signin(req, res) {
    try {
      const { username, password } = req.body;

      const userFind = await User.findOne({ username });

      if (!userFind) {
        return res.status(401).json({ error: 'User not found' })
      }

      if (!await userFind.compareHash(password)) {
        return res.status(401).json({ error: 'Password does not match' })
      }

      return res.json({
        userFind,
        token: userFind.generateToken(),
      })

    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export default new AuthController();

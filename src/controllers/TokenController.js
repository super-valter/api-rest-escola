// eslint-disable-next-line
import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais enválidas'],
      });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Senha ou usuário inválidos 1!'],
      });
    }

    const passwordIsValid = await user.passwordIsValid(password);

    if (!passwordIsValid) {
      return res.status(401).json({
        errors: ['Senha ou usuário inválidos 2!'],
      });
    }

    const { id } = user;

    const token = jwt.sign({ id, email }, process.env.SECRET, {
      expiresIn: process.env.SECRET_EXPIRATION,
    });
    return res.json({ token });
  }
}

export default new TokenController();

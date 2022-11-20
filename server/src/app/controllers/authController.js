const Register = require('../models/registers');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmPassword;
    if (password === cpassword) {
      const user = await Register.create(req.body);
      const token = createToken(user._id);
      res.send({ user, token });
    } else {
      res.send('Mật khẩu không trùng khớp');
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
module.exports.login_post = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Register.login(email, password);
    const token = createToken(user._id);
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
module.exports.logout_get = (req, res) => {
  res.redirect('/');
};

const jwt = require("jsonwebtoken");
const Register = require("../app/models/registers");

const auth = async function (req, res, next) {
  try {
    console.log('123123');
    const token = req.header('Authorization').replace('Bearer ', '');
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Register.findOne({ _id: verifyUser._id });
    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    res.render('login')
    // res.status(401).send(err);
  }
};
// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await Register.findById(decodedToken.id);
        res.locals.user = user;
        res.locals.fullname= user.fullname;
        res.locals.role = user.role;
        res.locals.phone = user.phone;
        res.locals.email = user.email
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { auth, checkUser };

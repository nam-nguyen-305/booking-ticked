const Register = require('../models/registers');
const jwt = require('jsonwebtoken');
const { mongooseToObject } = require('../../util/mongoose');
class userController {
  //[GET] /movies/:id/edit
  edit(req, res, next) {
    const token = req.cookies.jwt;
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userID = decoded.id;
    Register.findById({ _id: userID })
      .then((register) =>
        res.render('user/edit', {
          register: mongooseToObject(register),
        })
      )
      .catch(next);
  }
  //[PUT] /movies/:id
  update(req, res, next) {
    Register.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.status(200).send(req.body))
      .catch(next);
  }
}

module.exports = new userController();

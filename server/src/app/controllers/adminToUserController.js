const Register = require("../models/registers");

const { mongooseToObject } = require("../../util/mongoose");

class UserController {
  index(req, res, next) {
    Register.find({}).then((register) => {
      res.send({ register });
    });
  }
  store(req, res, next) {
    const register = new Register(req.body);
    register.save().catch((err) => {});
  }
  destroy(req, res, next) {
    Register.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Register.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[PATCH] /movie/:id/restore
  restore(req, res, next) {
    Register.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new UserController();

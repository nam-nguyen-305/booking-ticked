const Food = require('../models/food');

const { mongooseToObject } = require('../../util/mongoose');
class foodController {
  showListFood(req, res, next) {
    Food.find({})
      .then((food) => {
        res.send({ food });
      })
      .catch(next);
  }
  //[GET] /  /create
  create(req, res, next) {
    res.render('food/createFood');
  }
  //[POST] /  /create
  store(req, res, next) {
    const food = new Food(req.body);
    food
      .save()
      .then(() => res.send('add success'))
      .catch((err) => {});
  }
  //[GET] /movies/:id/edit
  edit(req, res, next) {
    Food.findById(req.params.id)
      .then((food) =>
        res.render('food/editFood', {
          food: mongooseToObject(food),
        })
      )
      .catch(next);
  } //[PUT] /movies/:id
  update(req, res, next) {
    Food.updateOne({ _id: req.params.id }, req.body).then(() =>
      res.send('ok')
    ).catch;
  }
  destroy(req, res, next) {
    Food.delete({ _id: req.params.id })
      .then(() => res.send('delete success'))
      .catch(next);
  }
  //[DELETE] /  /:id/force
  forceDestroy(req, res, next) {
    Food.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[PATCH] /movie/:id/restore
  restore(req, res, next) {
    Food.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new foodController();

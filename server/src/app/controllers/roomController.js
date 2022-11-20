const Room = require('../models/cinemaRoom');

class roomController {
  // [GET] /movies/:slug
  fetchListRoom(req, res, next) {
    Room.find({})
      .then((room) => res.send({ room }))
      .catch(next);
  }
  //[GET] /  /create
  create(req, res, next) {
    res.render('cinemaRoom/createRoom');
  }
  //[POST] /  /create
  store(req, res, next) {
    const room = new Room(req.body);
    room
      .save()
      .then(() => res.send(req.body))
      .catch((err) => res.send({ err }));
  }
  //[GET] /movies/:id/edit
  edit(req, res, next) {
    Room.findById(req.params.id)
      .then((room) => res.send({ room }))
      .catch(next);
  } //[PUT] /movies/:id
  update(req, res, next) {
    Room.updateOne({ _id: req.params.id }, req.body).then(() =>
      res.send(req.body)
    ).catch;
  }
  destroy(req, res, next) {
    Room.delete({ _id: req.params.id })
      .then(() => res.send('ok'))
      .catch(next);
  }
  //[DELETE] /  /:id/force
  forceDestroy(req, res, next) {
    Room.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[PATCH] /movie/:id/restore
  restore(req, res, next) {
    Room.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new roomController();

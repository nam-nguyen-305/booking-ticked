const Movie = require('../models/Movies');
const Room = require('../models/cinemaRoom');
const Showtime = require('../models/showtime');
const { mongooseToObject } = require('../../util/mongoose');
class showtimeController {
  // [GET] /movies/:slug
  fetchListShowtimeByMovie(req, res, next) {
    Showtime.find({ 'movie.slug': req.params.slug })
      .then((showtime) => res.send({ showtime: showtime }))
      .catch(next);
  }
  fetchListShowtime(req, res, next) {
    Showtime.find({})
      .then((showtime) => res.send({ showtime: showtime }))
      .catch(next);
  }
  //[GET] /  /create
  create(req, res, next) {
    Movie.find({})
      .lean()
      .then((movie) => {
        Room.find({})
          .lean()
          .then((room) => {
            res.render('showtimes/createShowtime', { movie, room });
          });
      });
  }
  //[POST] /  /create
  store(req, res, next) {
    const movieId = Movie.findOne({ _id: req.body.movieId }).lean();
    const roomId = Room.findOne({ _id: req.body.roomId }).lean();
    Promise.all([movieId, roomId]).then(([movieDT, roomDT]) => {
      let body = req.body;
      const movieDetail = {
        id: movieDT._id,
        name: movieDT.name,
        slug: movieDT.slug,
      };
      const roomDetail = {
        id: roomDT._id,
        name: roomDT.name,
      };

      body.movie = movieDetail;
      body.room = roomDetail;
      const showtimes = new Showtime(body);
      showtimes.save().then(() => {
        res.send('ok');
      });
    });
  }
  //[GET] /movies/:id/edit
  edit(req, res, next) {
    const callMovie = Movie.find({}).lean();
    const callRoom = Room.find({}).lean();
    const callShow = Showtime.findById(req.params.id).lean();
    Promise.all([callMovie, callRoom, callShow])
      .then(([movie, room, showtime]) => {
        res.render('showtimes/editShowtime', {
          movie,
          room,
          showtime,
        });
      })
      .catch(next);
  } //[PUT] /movies/:id
  update(req, res, next) {
    Showtime.updateOne({ _id: req.params.id }, req.body).then(() =>
      res.redirect('/me/stored/showtimes')
    ).catch;
  }
  destroy(req, res, next) {
    Showtime.delete({ _id: req.params.id })
      .then(() => res.send('back'))
      .catch(next);
  }
  //[DELETE] /  /:id/force
  forceDestroy(req, res, next) {
    Showtime.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[PATCH] /movie/:id/restore
  restore(req, res, next) {
    Showtime.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new showtimeController();

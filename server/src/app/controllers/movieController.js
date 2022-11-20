const Movie = require('../models/Movies');
const Room = require('../models/cinemaRoom');
const Showtime = require('../models/showtime');
const { mongooseToObject } = require('../../util/mongoose');
class movieController {
  // [GET] /movies/:slug
  showMovieDetail(req, res, next) {
    const callShowtime = Showtime.find({
      'movie.slug': req.params.slug,
    }).lean();
    const callMovie = Movie.findOne({ slug: req.params.slug });
    const callRoom = Room.find({}).lean();
    Promise.all([callMovie, callShowtime, callRoom])
      .then(([movie, showtime, room]) => {
        res.send({
          movie,
          showtime,
          room,
        });
      })

      .catch(next);
  }

  async showList(req, res, next) {
    const callMovie = await Movie.find({ status: '1' }).limit(
      parseInt(req.query.limit) == 6
    );
    // console.log(callMovie);
    // Promise.all(callMovie)
    //   .then((movie) => {
    //     res.send({
    //       movie,
    //     });
    //   })

    //   .catch(next);

    res.send({
      movies: callMovie,
    });
  }

  async showListComingSoon(req, res, next) {
    const callMovie = await Movie.find({ status: '2' }).limit(
      parseInt(req.query.limit) == 6
    );
    // console.log(callMovie);
    // Promise.all(callMovie)
    //   .then((movie) => {
    //     res.send({
    //       movie,
    //     });
    //   })

    //   .catch(next);

    res.send({
      movies: callMovie,
    });
  }
  //[POST] /  /create
  create(req, res, next) {
    const movie = new Movie(req.body);
    movie
      .save()
      .then(() => res.send(req.body))
      .catch((err) => {});
  }
  //[GET] /movies/:id/edit
  edit(req, res, next) {
    Movie.findById(req.params.id)
      .then((movie) =>
        // res.render("movies/edit", {
        //   movie: mongooseToObject(movie),
        // })
        res.send({ movie })
      )
      .catch(next);
  } //[PUT] /movies/:id
  update(req, res, next) {
    Movie.updateOne({ _id: req.params.id }, req.body).then(() =>
      res.send(req.body)
    ).catch;
  }
  destroy(req, res, next) {
    Movie.delete({ _id: req.params.id })
      .then(() => res.send(req.params.id))
      .catch(next);
  }
  //[DELETE] /  /:id/force
  forceDestroy(req, res, next) {
    Movie.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[PATCH] /movie/:id/restore
  restore(req, res, next) {
    Movie.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  load(req, res, next) {
    var date = req.params.date;
    console.log(date);
    const callMovie = Movie.findOne({ slug: req.params.slug });
    const callShowtime = Showtime.find({
      $and: [{ day: date }, { 'movie.slug': req.params.slug }],
    }).lean();
    const callRoom = Room.find({}).lean();
    Promise.all([callMovie, callShowtime, callRoom])
      .then(([movie, showtime, room]) => {
        res.render('movies/show', {
          movie: mongooseToObject(movie),
          showtime,
          room,
        });
        console.log(showtime.day);
      })
      .catch(next);
  }
}

module.exports = new movieController();

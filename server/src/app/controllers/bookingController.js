const Movie = require('../models/Movies');
const Room = require('../models/cinemaRoom');
const Showtime = require('../models/showtime');
const Ticked = require('../models/ticked');
const Food = require('../models/food');

class bookingController {
  bookingInfo(req, res, next) {
    var date = req.query.day;
    var startAt = req.query.startAt;
    var slug = req.query.slug;
    var room = req.query.room;
    const callTicked = Ticked.find({
      $and: [{ date: date }, { startAt: startAt }, { room: room }],
    }).lean();
    const callShowtime = Showtime.findOne({
      $and: [
        { startAt: startAt },
        { 'movie.slug': slug },
        { day: date },
        { 'room.name': room },
      ],
    }).lean();
    const callMovie = Movie.findOne({ slug: slug });
    const callRoom = Room.findOne({}).lean();

    Promise.all([callMovie, callShowtime, callRoom, callTicked])
      .then(([movie, showtime, room, ticked]) => {
        res.send({
          movie,
          showtime,
          room,
          ticked,
        });
      })
      .catch(next);
  }

  confirm(req, res, next) {
    const ticked = new Ticked(req.body);
    ticked
      .save()
      .then(() => res.status(200).send('ok'))
      .catch((err) => {});
  }

  async fetchTicked(req, res, next) {
    const callTicked = await Ticked.find({ email: req.params.email });
    res.send({
      ticked: callTicked,
    });
  }
  async fetchAllTicked(req, res, next) {
    const month = req.params.month;
    const callTicked = await Ticked.find({
      date: { $regex: month + '$' },
    });
    res.send({
      ticked: callTicked,
    });
  }
  async fetchOtherAllTicked(req, res, next) {
    const month = req.params.month;
    const callTicked = await Ticked.find({
      date: { $regex: month + '$' },
    });
    res.send({
      ticked: callTicked,
    });
  }

  pay(req, res, next) {
    Ticked.updateOne({ _id: req.params.id }, req.body).then(() =>
      res.redirect('/me/stored/tickeds')
    ).catch;
  }

  forceDestroy(req, res, next) {
    Ticked.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  success(req, res, next) {
    res.render('booking/success');
  }
}

module.exports = new bookingController();

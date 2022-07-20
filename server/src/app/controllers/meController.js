const Movie = require('../models/Movies');
const Employee = require('../models/employee');
const Room = require('../models/cinemaRoom');
const Showtime = require('../models/showtime');
const Register = require('../models/registers');
const Food = require('../models/food');
const Ticked = require('../models/ticked');
const jwt = require('jsonwebtoken');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class meController {
  // [GET] /me/stored/movies
  storedMovies(req, res, next) {
    Promise.all([Movie.find({}), Movie.countDocumentsDeleted()])
      .then(([movies, deletedCount]) =>
        res.send({
          deletedCount,
          movies,
        })
      )
      .catch(next);
  }
  // [GET] /me/trash/movies
  trashMovies(req, res, next) {
    Movie.findDeleted({})
      .then((movies) =>
        res.send({
          movies,
        })
      )
      .catch(next);
  }
  // ===============================================
  // ROOM
  storedRooms(req, res, next) {
    Promise.all([Room.find({}), Room.countDocumentsDeleted()])
      .then(([rooms, deletedCount]) =>
        res.send({
          deletedCount,
          rooms,
        })
      )
      .catch(next);
  }
  // [GET] /me/trash/rooms
  trashRooms(req, res, next) {
    Room.findDeleted({})
      .then((rooms) =>
        res.send({
          rooms,
        })
      )
      .catch(next);
  }

  // ========================================================
  // SHOWTIME

  storedShowtimes(req, res, next) {
    Promise.all([
      Showtime.find({}).lean(),
      Showtime.countDocumentsDeleted(),
    ])
      .then(([Showtimes, deletedCount]) =>
        res.send({
          deletedCount,
          Showtimes,
        })
      )
      .catch(next);
  }
  // [GET] /me/trash/showtimes
  trashShowtimes(req, res, next) {
    Showtime.findDeleted({})
      .lean()
      .then((Showtimes) =>
        res.send({
          Showtimes,
        })
      )
      .catch(next);
  }

  storedUsers(req, res, next) {
    Promise.all([
      Register.find({ role: 2 }),
      Register.countDocumentsDeleted(),
    ])
      .then(([register, deletedCount]) =>
        res.send({
          deletedCount,
          register,
        })
      )

      .catch(next);
  }
  trashUsers(req, res, next) {
    Register.findDeleted({})
      .lean()
      .then((registers) =>
        res.send({
          registers,
        })
      )
      .catch(next);
  }
  forceDestroy(req, res, next) {
    Register.deleteOne({ _id: req.params.id })
      .then(() => res.send(req.params.id))
      .catch(next);
  }
  storedTicked(req, res, next) {
    const token = req.cookies.jwt;
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userID = decoded.id;
    Register.findOne({ _id: userID })
      .lean()
      .then((register) => {
        Ticked.find({ email: register.email }).then((tickeds) => {
          res.send({
            tickeds,
          });
        });
      });
  }
  trashTicked(req, res, next) {
    Ticked.findDeleted({})
      .lean()
      .then((tickeds) => res.send({}))
      .catch(next);
  }

  storedEmployees(req, res, next) {
    Promise.all([Employee.find({}), Employee.countDocumentsDeleted()])
      .then(([employees, deletedCount]) =>
        res.send({
          deletedCount,
          employees,
        })
      )
      .catch(next);
  }
  // [GET] /me/trash/employees
  trashEmployees(req, res, next) {
    Employee.findDeleted({})
      .then((employees) =>
        res.send({
          employees,
        })
      )
      .catch(next);
  }

  storedFood(req, res, next) {
    Promise.all([Food.find({}).lean(), Food.countDocumentsDeleted()])
      .then(([food, deletedCount]) =>
        res.send({
          deletedCount,
          food,
        })
      )
      .catch(next);
  }
  // [GET] /me/trash/showtimes
  trashFood(req, res, next) {
    Food.findDeleted({})
      .lean()
      .then((food) =>
        res.send({
          food,
        })
      )
      .catch(next);
  }
}

module.exports = new meController();

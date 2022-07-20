const express = require('express');
const route = require('.');
const router = express.Router();
const { auth, checkUser } = require('../util/auth');
const meController = require('../app/controllers/meController');

router.get('/stored/movies', meController.storedMovies);
router.get('/trash/movies', meController.trashMovies);

router.get('/stored/rooms', meController.storedRooms);
router.get('/trash/rooms', meController.trashRooms);

router.get('/stored/showtimes', meController.storedShowtimes);
router.get('/trash/showtimes', meController.trashShowtimes);

router.get('/stored/users', meController.storedUsers);
router.get('/trash/users', meController.trashUsers);
router.delete('/delete/users/:id', meController.forceDestroy);

router.get('/stored/tickeds', auth, meController.storedTicked);
router.get('/trash/tickeds', auth, meController.trashTicked);

router.get('/stored/employees', auth, meController.storedEmployees);
router.get('/trash/employees', auth, meController.trashEmployees);

router.get('/stored/food', auth, meController.storedFood);
router.get('/trash/food', auth, meController.trashFood);
module.exports = router;

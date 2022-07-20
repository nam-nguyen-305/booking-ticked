const express = require('express');
const route = require('.');
const router = express.Router();
const { auth, checkUser } = require('../util/auth');

const bookingController = require('../app/controllers/bookingController');

router.get('/info', bookingController.bookingInfo);
router.post('/confirm-booking', bookingController.confirm);
router.get('/get-list-ticked/:email', bookingController.fetchTicked);
router.put('/:id', bookingController.pay);
router.get('/success', bookingController.success);
router.delete('/:id/force', bookingController.forceDestroy);
module.exports = router;

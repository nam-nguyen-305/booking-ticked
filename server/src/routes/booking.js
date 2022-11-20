const express = require('express');
const router = express.Router();

const bookingController = require('../app/controllers/bookingController');

router.get('/info', bookingController.bookingInfo);
router.post('/confirm-booking', bookingController.confirm);
router.get('/get-list-ticked/:email', bookingController.fetchTicked);
router.get(
  '/get-all-ticked/:month',
  bookingController.fetchAllTicked
);
router.get(
  '/get-other-all-ticked/:month',
  bookingController.fetchOtherAllTicked
);

router.put('/:id', bookingController.pay);
router.get('/success', bookingController.success);
router.delete('/:id/force', bookingController.forceDestroy);
module.exports = router;

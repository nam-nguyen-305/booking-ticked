const express = require('express');
const router = express.Router();

const showtimeController = require('../app/controllers/showtimeController');

//movieController.index
router.get('/create', showtimeController.create);
router.post('/store', showtimeController.store);
router.get('/:id/edit', showtimeController.edit);
router.put('/:id', showtimeController.update);
router.delete('/:id', showtimeController.destroy);
router.delete('/:id/force', showtimeController.forceDestroy);
router.patch('/:id/restore', showtimeController.restore);
router.get(
  '/list-showtime/:slug',
  showtimeController.fetchListShowtimeByMovie
);

module.exports = router;

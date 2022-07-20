const express = require('express');
const route = require('.');
const router = express.Router();
const { auth, checkUser } = require('../util/auth');

const movieController = require('../app/controllers/movieController');

//movieController.index
router.get('/list', movieController.showList);
router.get('/list-coming-soon', movieController.showListComingSoon);
router.get('/movie-detail/:slug', movieController.showMovieDetail);
router.post('/create', movieController.create);
router.get('/:id/edit', movieController.edit);
router.put('/update/:id', movieController.update);
router.delete('/delete/:id', movieController.destroy);
router.delete('/:id/force', movieController.forceDestroy);
router.patch('/:id/restore', movieController.restore);
router.get('/:slug/:date', movieController.load);
// router.get("/:slug", movieController.show);

// router.get('/loadShowtime/:slu',auth, movieController.load)

module.exports = router;

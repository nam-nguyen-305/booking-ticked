const express = require('express');
const route = require('.');
const router = express.Router();
const { auth, checkUser } = require('../util/auth');

const foodController = require('../app/controllers/foodController');

//movieController.index
router.get('/show-list-food', foodController.showListFood);
router.get('/create', foodController.create);
router.post('/store', foodController.store);
router.get('/:id/edit', foodController.edit);
router.put('/update/:id', foodController.update);
router.delete('/delete/:id', foodController.destroy);
router.delete('/:id/force', foodController.forceDestroy);
router.patch('/:id/restore', foodController.restore);
// router.get('/:slug', auth, roomController.show);

module.exports = router;

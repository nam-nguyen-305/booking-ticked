const express = require('express');
const router = express.Router();

const roomController = require('../app/controllers/roomController');

//movieController.index
router.get('/fetchListRoom', roomController.fetchListRoom);
router.post('/store', roomController.store);
router.get('/:id/edit', roomController.edit);
router.put('/update/:id', roomController.update);
router.delete('/delete/:id', roomController.destroy);
router.delete('/:id/force', roomController.forceDestroy);
router.patch('/:id/restore', roomController.restore);

module.exports = router;

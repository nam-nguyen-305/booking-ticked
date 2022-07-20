const express = require('express');
const route = require('.');
const router = express.Router();

const userController = require('../app/controllers/userController');
router.get('/edit', userController.edit);
router.patch('/update/:id', userController.update);

module.exports = router;

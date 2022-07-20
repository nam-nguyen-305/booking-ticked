const express = require('express');
const route = require('.');
const router = express.Router();
const { auth, checkUser } = require("../util/auth");

const adminUserController = require('../app/controllers/adminToUserController');

router.get('/', auth, adminUserController.index);
router.delete('/:id', auth, adminUserController.destroy);
router.delete('/:id/force', auth, adminUserController.forceDestroy);
router.patch('/:id/restore', auth, adminUserController.restore);


module.exports = router;
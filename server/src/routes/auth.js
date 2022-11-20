const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');

router.post('/register', authController.signup_post);

router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;

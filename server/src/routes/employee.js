const express = require('express');
const route = require('.');
const router = express.Router();
const { auth, checkUser } = require("../util/auth");


const employeeController = require('../app/controllers/employeeController');

//employeeController.index
router.get('/create', auth, employeeController.create);
router.post('/store', auth, employeeController.store);
router.get('/:id/edit', auth, employeeController.edit);
router.put('/:id', auth, employeeController.update);
router.delete('/:id', auth, employeeController.destroy);
router.delete('/:id/force', auth, employeeController.forceDestroy);
router.patch('/:id/restore', auth, employeeController.restore);


module.exports = router;
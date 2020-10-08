'use strict'

const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.route('/login')
	.get(authController.getLogin)
	.post(authController.postLogin)

router.post('/logout',authController.postLogut)	

router.route('/signup')
	.get(authController.getSignup)
	.post(authController.postSignup)


module.exports = router;

'use strict'

const bcrypt = require('bcryptjs')
const User = require('../models/users')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
	auth: {
		// api_key: 
	}
}))

const getLogin = (req, res) => {
    return res.render('auth/login', {
        pageTitle: 'login',
        path: '/login',
        errorMessage: req.flash('error')
    })
}

const postLogin = (req,res) => {
	const email = req.body.email
	const password = req.body.password
	User.findOne({email: email})
		.then(user => {
			if (!user) {
				req.flash('error','Invalid email or password !')
				return res.redirect('/login')
			}
			return bcrypt.compare(password,user.password)
				.then(isPasswordMatch => {
					if (isPasswordMatch) {
						req.session.isLoggedIn = true;
				    	req.session.user = user;
				    	return req.session.save(err => {
					        res.redirect('/');
				    	});
					}
					req.flash('error','Invalid email or password !')
					return res.redirect('/login')
				})
		})
}

const postLogut = (req,res) => {
	req.session.destroy(() => {
		res.redirect('/')	
	})
	
}

const getSignup = (req,res) => {
	res.render('auth/signup',{
		path: '/signup',
		pageTitle: 'Signup',
		errorMessage: req.flash('error')
	})
}

const postSignup = (req,res) => {
	const name = req.body.name
	const email = req.body.email
	const password = req.body.password
	User.findOne({email: email})
		.then(user => {
			if (user){
				req.flash('error','Email already exists! please enter valid Email!')
				return res.redirect('/signup')
			}
			return bcrypt.hash(password,13)
				.then(hashPassword => {
					const user = new User({
						name : name,
						email: email,
						password: hashPassword,
						cart: {
							items: []
						}
					})
					return user.save()
				})
				.then(result => {
					return res.redirect('/login')
				})
		})
		.catch(err => {
			console.log(err)
		})
}

module.exports = {getLogin,postLogin,postLogut,getSignup,postSignup} 
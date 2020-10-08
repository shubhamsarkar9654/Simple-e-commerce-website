'use strict'

const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	cart: {
		items: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true
				},
				quantity: {
					type: Number,
					required: true
				}
			}
		]
	}
})

module.exports = mongoose.model('User',userSchema)
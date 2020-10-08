'use strict'

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
	name: {
			type: String,
			required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	products: [
		{
			product: {
				type: Object,
				ref: 'Product',
				required: true

			},
			quantity: {
				type: Number,
				required: true
			}
		}
	]
})


module.exports = mongoose.model('Order',orderSchema)

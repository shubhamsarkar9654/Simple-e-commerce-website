'use strict'

const bcrypt = require('bcryptjs')
const User = require('../models/users')
const Product = require('../models/product')
const sampleProduct = require('./sampleProducts.json')

exports.createSamples = () => {
    User.findOne({email: 'banner@gmail.com'})
		.then(user => {
			if (!user) {
				return bcrypt.hash('123',10)
                    .then(async hashPassword => {
                        const user = await new User({
                            name : 'banner',
                            email: 'banner@gmail.com',
                            password: hashPassword,
                            cart: {
                                items: []
                            }
                        })
                        await user.save()//saving user
                        return User.findOne({email: 'banner@gmail.com'})
                            .then(user => {
                                if (user) {
                                    return sampleProduct.map(async p => {
                                        const product = await new Product({
                                            title: p.title,
                                            price: p.price,
                                            description: p.description,
                                            imageUrl: p.imageUrl,
                                            userId: user._id
                                        })
                                        product.save()
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })                      
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }         
        })
        .catch(err => {
            console.log(err)
        })
};

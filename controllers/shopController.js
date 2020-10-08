  'use strict'

const Product = require('../models/product')
const User = require('../models/users')
const Order = require('../models/orders')


const getIndex = (req, res) => {
    Product.find()
        .then(products => {
            return res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
           })
        })
        .catch(err => {
            console.log(err)
       })
}

const getProducts = (req, res) => { 
    Product.find()
        .then(products => {
            return res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            })
        })
        .catch(err => {
            console.log(err)
        })
}


const getProduct = (req,res) => {
    Product.findById(req.params.productId)
        .then(product => {
            return res.render('shop/product-detail',{
                product: product,
                pageTitle: product.title,
                path: '/products'
            })
        })
        .catch(err => {
            console.log('i am err\n\n\n',err)
        })
}

const getCart = (req, res) => {
    User.findById(req.user._id)
        .populate('cart.items.productId')
        .then(user => {
            return res.render('shop/cart', {
                products: user.cart.items,
                path: '/cart',
                pageTitle: 'Your Cart'
            })
        })
}

const postCart = (req,res) => {
    const user = req.user
    Product.findById(req.body.productId)
        .then(product => {
            const productIndex = user.cart.items.findIndex(p => {
                return (product._id).toString() == p.productId.toString()
            })
            if (productIndex != -1){
                user.cart.items[productIndex].quantity++
                return user.save()
            }else{
                const cartItem = {
                    productId: product._id,
                    quantity: 1
                }
                user.cart.items.push(cartItem)
                return user.save()
            }
        })
        .then(() => {
            return res.redirect('/cart')
        })
}

const postDeleteCart = (req,res) => {
    User.findById(req.user._id)
        .then(user => {
            const updateCart = user.cart.items.filter(item => {
                return item.productId.toString() != req.body.productId
            })
            user.cart.items = updateCart
            user.save()
            return res.redirect('/cart')
        })
}


 const getOrders = (req, res) => {
    Order.find({userId:req.user._id})
        .then(orders => {
            return res.render('shop/orders', {
                orders: orders,
                path: '/orders',
                pageTitle: 'Your Orders'
            }); 
        });
};

const postOrders = (req,res) => {
    User.findById(req.user._id)
        .populate('cart.items.productId')
        .then(user => {
            const order = new Order ({
                name: user.name,
                userId: user._id,
                products: user.cart.items.map(i => {
                    return {product: {...i.productId},quantity: i.quantity}
                })
            })
            order.save()
            return user
        })
        .then((user) => {
            user.cart.items = []
            user.save()
            return res.redirect('/orders')
        })  
}


// const getCheckout = (req, res) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };

module.exports = {getIndex,getProducts,getProduct,getCart,postCart,postDeleteCart,getOrders,postOrders}



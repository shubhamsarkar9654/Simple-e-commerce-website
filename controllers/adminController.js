'use strict'

const Product = require('../models/product')
const User = require('../models/users')

const getProducts = (req, res) => {
    Product.find()
        // .populate('userId')
        .then(products => {
            return res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'               
            }) 
        })
        .catch((err) => {
            console.log(err)
        })
}

const getAddProduct = (req, res) => {
    return res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}


const postAddProduct = (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.user
    })
    product.save()
        .then(result => {
            return res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

const getEditProduct = (req,res) => { 
    Product.findById(req.params.productId)
        .then(product => {
            return res.render('admin/edit-product', {
                product: product,
                pageTitle: 'edit Product',
                path: '/admin/edit-product'         
            })
        })
}

const postEditProduct = (req,res) => {
    Product.findById(req.body.productId)
        .then(product => {
            product.title = req.body.title,
            product.price = req.body.price,
            product.imageUrl = req.body.imageUrl,
            product.description = req.body.description
            return product.save()
        })
        .then(() => {
            return res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

const postDeleteProduct = (req,res) => {
    Product.findByIdAndRemove(req.body.productId)
        .then(() => {
            return res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {getProducts,getAddProduct,postAddProduct,getEditProduct,postEditProduct,postDeleteProduct}

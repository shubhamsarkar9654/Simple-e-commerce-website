'use strict'

const path = require('path');
const express = require('express');

const adminController = require('../controllers/adminController');
const isAuth = require('../middleware/isAuth')

const router = express.Router();


// /admin/products => GET
router.get('/products',isAuth, adminController.getProducts);

// /admin/add-product
router.route('/add-product')
	.get(isAuth,adminController.getAddProduct)
	.post(isAuth,adminController.postAddProduct);

router.get('/edit-product/:productId',isAuth,adminController.getEditProduct)
	
router.post('/edit-product',isAuth,adminController.postEditProduct)

router.post('/delete-product',isAuth,adminController.postDeleteProduct)



module.exports = router;

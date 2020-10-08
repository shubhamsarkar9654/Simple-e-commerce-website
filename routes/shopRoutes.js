'use strict'

const express = require('express');

const shopController = require('../controllers/shopController');
const isAuth = require('../middleware/isAuth')

const router = express.Router();


router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProduct)

router.route('/cart')
	.get(isAuth, shopController.getCart)
	.post(isAuth, shopController.postCart)

router.post('/cart-delete-item', isAuth, shopController.postDeleteCart)

router.get('/orders', isAuth, shopController.getOrders);
router.post('/create-order', isAuth, shopController.postOrders)

// router.get('/checkout', shopController.getCheckout);

module.exports = router;

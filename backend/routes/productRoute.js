const express = require('express');
const {addProductController, getAllProductsController, getSingleProductController, deleteProductController, editProductController, payLaterController, getAllMyOrders, deleteOrder, updateOrder, payNowController} = require('../controllers/productController');
const { protectedRoute } = require('../utils/protectedRoute');
 
router = express.Router()

router.post('/pay-later', payLaterController)
router.post('/pay-now', payNowController)

router.post('/', addProductController)
router.put('/:id', editProductController)
router.delete('/:id', deleteProductController)
router.get('/all-products', getAllProductsController)
router.delete('/order/:id', protectedRoute,deleteOrder)
router.put('/order/:id', updateOrder)
router.get('/:id', getSingleProductController)



module.exports = router;
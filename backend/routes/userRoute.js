const express = require('express');
const { registerController, loginController, forgotPasswordController, getUserController } = require('../controllers/userController');
const { protectedRoute } = require('../utils/protectedRoute');
const { getAllMyOrders, getAllOrders } = require('../controllers/productController');
const productModel = require('../models/productModel');
router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forgot-password',forgotPasswordController)
router.get('/get-user',protectedRoute,getUserController) 
router.get('/my-orders',protectedRoute,getAllMyOrders) 
router.get('/all-orders',getAllOrders) 
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query; 
        console.log(query);
        const searchResults = await productModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
            ]
        });

        res.status(200).send(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to perform search.' });
    }
}); 



module.exports = router;
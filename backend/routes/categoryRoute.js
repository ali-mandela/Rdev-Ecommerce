const express = require('express');
const { protectedRoute } = require('../utils/protectedRoute');
const { deleteCategoryController, createCategoryController, getAllcategoriesController } = require('../controllers/categoryController');
router = express.Router()

router.post('/',protectedRoute, createCategoryController) 
router.get('/',protectedRoute, getAllcategoriesController) 
router.delete('/:id',protectedRoute, deleteCategoryController)


module.exports = router;
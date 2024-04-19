const categoryModel = require("../models/categoryModel");


const createCategoryController = async (req, res) => {

    try {
        const category = await categoryModel.findOne({name: req.body.name})
        if(category){
            return res
            .status(201)
            .send({
                message: "category already exist",
                success: false
            });
        }

        const newCategory = new categoryModel({
            name : req.body.name
        })

        newCategory.save();

        return res
            .status(200)
            .send({
                message: "category created succesfully",
                success: true,
            });

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({
                message: "Internal server error",
                success: false
            });
    }

}

const getAllcategoriesController = async (req, res) => {

    try {


        const categories = await categoryModel.find()

        return res
            .status(200)
            .send({
                message: "All categories list",
                success: true,
                data: {
                    categories: categories,
                }
            });

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({
                message: "Internal server error",
                success: false
            });
    }

}

const deleteCategoryController = async (req, res) => {
    try {
        // Check if the category exists
        const category = await categoryModel.findById(req.params.id);

        // If the category does not exist
        if (!category) {
            return res.status(404).send({
                message: "Category not found",
                success: false
            });
        }

        // Delete the category
        await categoryModel.findByIdAndDelete(req.params.id);

        return res.status(200).send({
            message: "Category deleted successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal server error",
            success: false
        });
    }
}


module.exports = { 
    createCategoryController,getAllcategoriesController,deleteCategoryController
 }
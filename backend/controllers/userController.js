const bcryptjs = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')


const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({
            email: req.body.email
        });
        if (existingUser) {
            return res
                .status(200)
                .send({
                    message: "User already exists",
                    success: false
                });
        } 
        const hashedPassword = bcryptjs.hashSync(req.body.password, 10);   
        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email, 
            password: hashedPassword,  
            securityCode: req.body.securityCode
        });

        await newUser.save();

        const token = jwt.sign({
            _id: newUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        }); 
        return res
            .status(201)
            .send({
                message: "Registered successfully",
                success: true,
                data: {
                    user: newUser,
                    token: token
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
};


const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({
            email: req.body.email
        }).select('+password');
        if (!user) {
            return res
                .status(200)
                .send({
                    message: "User doesn't found",
                    success: false
                });
        }
        const isMatch = bcryptjs.compareSync(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(201)
                .send({
                    message: "password dot not matched",
                    success: false
                });
        }

        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        return res
            .status(201)
            .send({
                message: "login successfully",
                success: true,
                data: {
                    user: user,
                    token: token
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
};

const forgotPasswordController = async (req, res) => {
    try {
        const { email, securityCode, password } = req.body;

        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(200).send({
                message: "User not found",
                success: false
            });
        }

        if (user.securityCode !== securityCode) {
            return res.status(200).send({
                message: "Security code doesn't match, kindly enter the correct code.",
                success: false
            });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        user.password = hashedPassword;
        await user.save(); // Await the save operation

        return res.status(201).send({
            message: "Password changed successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).send({
            message: "Internal server error",
            success: false
        });
    }
};

const getUserController = async(req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId})
        if (!user) {
            return res
                .status(200)
                .send({message: "User doesn't exists", success: false});
        } else {
            return res
                .status(200)
                .send({message: "user data fetched succesfully", data: {
                        user
                    }, success: true});
        }

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({message: "Auth error", success: false});
    }

}


module.exports = {
    registerController,getUserController, loginController, forgotPasswordController
}
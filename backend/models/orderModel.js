const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    },
    items:[],
    totalAmount: {
        type: Number,
        required: true

    },
    payment: {
        type: Boolean,
        default: false

    },
    status: {
        type: String,
        enum:["Pending","Delivered"],
        default: "Pending"

    },
    address:{
        type: String,
        required: true

    },
    createdAt: {
        type: Date, 
        default: Date.now()

    },
   
    
}, {
    timestamps: true
})

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;
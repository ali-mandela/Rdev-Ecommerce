const mongoose = require('mongoose') 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        minlength: 8, 
    },  
     role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    }, 
    securityCode:{
        type: String,
        required: true, 
    },
    houseNo:{
        type:String
    },
    street:{
        type:String
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zipCode:{
        type:String
    },
    cart:{
        type:Array,
        default:[]
    }

},{
    timestamps:true
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
    title: {
        type:String
    },
    descrption: {
        type:String
    },
    price: {
        type:String
    },
    image: {
        type:String
    }
})
module.exports= mongoose.model('Cart',Cart)
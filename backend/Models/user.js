const mongoose = require('mongoose');
const user = mongoose.model('user',{
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
})

module.exports = user ;
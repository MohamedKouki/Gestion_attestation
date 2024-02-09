const mongoose = require('mongoose')
const admin = mongoose.model('admin',{
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

module.exports = admin ;
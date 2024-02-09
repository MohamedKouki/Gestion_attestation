const mongoose = require('mongoose');
const certificate = mongoose.model('certificate',{
    name : {
        type : String
    },
    url : {
        type : String
    },
    state : {
        type : Boolean
    }
})
module.exports = certificate ;
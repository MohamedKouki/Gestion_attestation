const mongoose = require('mongoose');
const certif = mongoose.model('certif',{
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    dateD : {
        type : String
    },
    dateF : {
        type : String
    },
    theme : {
        type : String
    }
})

module.exports = certif ;
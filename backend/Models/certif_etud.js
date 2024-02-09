const mongoose = require('mongoose');
const certif = mongoose.model('certif',{
    name : {
        type : String
    },
    dateDebut : {
        type : String
    },
    dateFin : {
        type : String
    },
    theme : {
        type : String
    }
})

module.exports = certif ;
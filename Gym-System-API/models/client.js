'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const clientSchema = Schema({
    name : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        require : true
    },
    dateOfBirth : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    zip : {
        type : Number,
        require : true
    },
    membershipPlan : {
        type : String,
        require : true
    },
    registrationDate : {
        type: String,
        required: true
    },
    createAt : {
        type: Date, 
        default: Date.now, 
        required: true
    }

})

module.exports = mongoose.model('client', clientSchema);
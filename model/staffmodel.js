const mongoose = require ('mongoose');


const staffschema = new mongoose.Schema({
    name: {
        type : String,
        require :true
    },
    email: {
        type : String,
        require :true
    },
    password: { 
        type: String,
        require :true
    }
});
module.exports = mongoose.model('staff',staffschema);
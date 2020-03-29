const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const CaseSchema = new Schema({
    category:{
        type: String,
        required: true
    },
    approved:{
        type: Boolean,
        default: true
    },
    description:{
        type: String,
        required: true
    },
    closed:{
        type: Boolean,
        default: false
    },
    location:{
        type: String
    },
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required: true
    },
    email:{
        type:String
    },
    created:{
        type: Date,
        default: Date.now
    }
});

CaseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('cases', CaseSchema);
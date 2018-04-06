const mongoose = require('mongoose');
UserSessionSchema = new mongoose.Schema({
    userId:{
        type: String,
        default:''
    },
    timeStamp:{
        type:Date,
        default:Date.now()
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
        default:''
    }
})
module.exports = mongoose.model('UserSession',UserSessionSchema);
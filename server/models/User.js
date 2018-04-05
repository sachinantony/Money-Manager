const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        default:''
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})
const categorySchema = new mongoose.Schema({
    catName:{
        type:String,
        default: ''
    },
    transactions:[transactionSchema]
})

const acctSchema = new mongoose.Schema({
    acctName:{
        type:String,
        default: ''
    },
    currency:{
        type:String,
        default: ''
    },
    categories:[categorySchema],
    isDeleted:{
        type:Boolean,
        default:false
    }
});
const UserSchema = new mongoose.Schema({
    fName:{
        type:String,
        default: ''
    },
    lName:{
        type:String,
        default: ''
    },
    email:{
        type:String,
        default: ''
    },
    password:{
        type:String,
        default: ''
    },
    accounts:[acctSchema],
    isDeleted:{
        type:Boolean,
        default:false
    }

});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}
UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',UserSchema);
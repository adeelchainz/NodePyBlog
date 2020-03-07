const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

const saltRounds=10;

//Defining schema
const userSchema= mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

//Encrypting passwords
userSchema.pre('save', function(next){
    var user= this;

    if(user.isModified('password')){

        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password= hash
                next() //Err1
            })
        })
    }else {
        next()
    }
});

//ComparePassword
userSchema.methods.comparePassword= function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

//gnerateToken
userSchema.methods.generateToken= function(cb){
    var user= this;
    var token= jwt.sign(user._id.toHexString(), 'secret')

    user.token= token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null,user);
    })
}

//FindbyToken
userSchema.static.findbyToken= function(token,cb){
    var user= this;

    jwt.verify(token, 'secret', function(err,decode){
        user.findOne({"id":decode, "token":decode}, function(err, user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}

//Creating and exporting model
const User= mongoose.model('User', userSchema)
module.exports={User}

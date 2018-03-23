var mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({
    
    FirstName : {
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    

    UserName:{
        type:String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    
    Password:{
        type: String,
        required: true
    },

    
    tokens: [{
        access: {
            type: String,
            
        },
        token: {
            type: String,
            
        }
    }],
    

    

    
        

});



UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens.push({ access, token }); 

    return user.save().then(() => {
        return token;
    });
};


    
    
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
};



UserSchema.statics.findByToken = function (token) {
    var User = this;
    
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return {_id:user._id,Email:user.Email};
};



UserSchema.statics.findByCredentials = function (email, password) {
    
    var User = this;

    return User.findOne({Email:email}).then((user) => {
        if (!user) {
            
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
                
            
                if (password === user.Password) {
                    resolve(user);
                } else {
                    reject();
                }
            
        });
    });
};
UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    });
};

UserSchema.statics.getProfile = function (date) {
    var User = this;
    
};



UserSchema.methods.EditPassowrd =  (NewPassword) => {
    var User = this;
    User.update({$set:{Password:NewPassword}});
    
    
};














var User = mongoose.model("User",UserSchema);


module.exports = {User};
const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const {ObjectId} = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxLength: 32
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        require: true,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
   photo: {
       data: Buffer,
       contentType: String
   },  
   updated: Date,
   resetPasswordLink: {
    data: String,
    default: ''
    },
    role: {
        type: String,
        default: 'student'
    },
    code: {
        type: Number
    }

}, 
{timestamps: true}

);

// virtual fields 
userSchema.virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    })

    .get(function() {
        return this._password
    })

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },


    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return '';
        }
    }
}

userSchema.pre('remove', function(next) {
    Post.remove({postedBy: this._id}).exec();
    next()
})


module.exports = mongoose.model("User", userSchema);
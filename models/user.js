const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

userSchema.pre('save', async function(next){
    try{
        // If password hasn't been changed, don't hash it again
        if(!this.isModified("password")){
            return next;
        }
        // Hash password. Second param is a SALT factor - take additional info and put in hash, so that hashes are differenct for same password
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next;
    } catch (err) {
        // pass err to error handler
        return next(err);
    }
});

// Next for async functions to tell express when to move on to next piece of middleware.
// Instance method to check input password to password saved in db
userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        // isMatch will return a boolean
        return isMatch;
    } catch (err) {
        return next(err);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
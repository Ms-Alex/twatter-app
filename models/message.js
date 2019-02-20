const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 160,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: Number
    }
},
    {
        timestamps: true
    }
);

//assure that message record is not only deleted from message table, but user table too
messageSchema.pre("remove", async function (next) {
    try {
        // find a user
        let user = await User.findById(this.user);
        // remove id of message from their message list
        user.messages.remove(this.id)
        // save that user
        await user.save();
        return next();

    } catch (err) {
        return next(err);
    }

});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
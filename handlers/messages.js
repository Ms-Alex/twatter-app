const db = require('../models');

exports.createMessage = async function(req, res, next) {
    try {
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id,
            likes: 0
        });

        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();

        // send back message with that user's data too
        let foundMessage = await db.Message.findById(message._id).populate("user", {
            // sent back data will include these fields
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};

exports.getMessage = async function(req, res, next) {
    try {
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
        
    } catch (err) {
        return next(err);
    }

};

exports.deleteMessage = async function(req, res, next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};

exports.editMessage = async function(req, res, next) {
    try {
        let message = await db.Message.findOneAndUpdate({_id: req.params.message_id}, { $set: req.body }, {new: true});
        console.log(message);
        return res.status(200).json(message);

    } catch (err) {
        return next(err);
    }
}
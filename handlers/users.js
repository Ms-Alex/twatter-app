const db = require('../models');

exports.getUser = async function (req, res, next) {
    try {
        let user = await db.User.findById(req.params.user_id);
        console.log(user)
        return res.status(200).json(user);

    } catch (err) {
        return next(err);
    }

};

exports.editUser = async function (req, res, next) {
    try {
        let user = await db.User.findOneAndUpdate({ _id: req.params.user_id }, { $set: req.body }, { new: true });
        return res.status(200).json(user);

    } catch (err) {
        return next(err);
    }
};
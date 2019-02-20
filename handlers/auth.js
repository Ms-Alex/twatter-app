const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next){
    try {
        //find user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        //check if their password matches
        let isMatch = await user.comparePassword(req.body.password);
        //login them in, by createing a jwt
        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid Email/Password'
            })
        }
    } catch (err) {
        return next({
            status: 400,
            message: 'Invalid Email/Password'
        });
    }
    
}

exports.signup = async function(req, res, next){
    try {
        //create a user
        let user = await db.User.create(req.body); 
        let { id, username, profileImageUrl } = user;
        //create a token (signing a token). To create one we need a secret key
        let token = jwt.sign(
            {
                id, 
                username,
                profileImageUrl
            }, 
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch (err) {
        //if a validation fails! 
        //see what kind of err
        //if it is a certain err
        //respomd with email/username already taken
        //otherwise send back a generic 404 message
        if(err.code === 11000){
            err.message = "Sorry that username and/or email is already taken."

        }
        return next({
            status: 400,
            message: err.message
        })
        
    }
}
require('dotenv').config();  // will load all env variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const usersRoutes = require('./routes/users');
const db = require('./models');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

//all routes here. Order matters.
app.use('/api/auth', authRoutes)
app.use(
    '/api/users/:id/messages', 
    loginRequired, 
    ensureCorrectUser, 
    messagesRoutes.router1
);

app.use('/api/messages', 
    loginRequired, 
    messagesRoutes.router2, 
    async function(req, res, next){
        try {
            let messages = await db.Message.find().sort({ createdAt: "desc"}).populate("user", {
                username: true,
                profileImageUrl: true
            });
            return res.status(200).json(messages);
        } catch (err) {
            return next(err);
        }
    }
);

app.use('/api/users', 
    loginRequired, 
    usersRoutes
)

//error handler
app.use(function(req, res, next){
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Take any incoming middleware with an error and it'll print out a nicer display using json, else html would show up; which is not what I want.
app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
});

module.exports.app = app;


const seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_URI || "mongodb://localhost/twatter", {
    // To keep connection open
    keepAlive: true,
    useNewUrlParser: true
}, function () {

    // Load Mongoose models
    seeder.loadModels([
        'models/user.js'
    ]);

    // Clear specified collections
    seeder.clearModels(['User'], function () {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });

    });
});

// Data array containing seed data - documents organized by Model
let data = [{
    'model': 'User',
    'documents': [{
        'email': 'user1@email.com',
        'username': 'user_1',
        'password': 'user123',
        'profileImageUrl': 'https://d2lv662meabn0u.cloudfront.net/show/00000000/9/829e96a3699d831e342f899b139e18cb58ebe0c5_1538660377.jpg'
    }
    ]
}];
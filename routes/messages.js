const express = require('express');
// mergeParams will allows to get access to the id inside of his router
const router1 = express.Router({ mergeParams: true });
const router2 = express.Router({ mergeParams: true });

const { createMessage, getMessage, deleteMessage, editMessage } = require('../handlers/messages')

// prefix - /api/users/:id/messages
router1.route('/').post(createMessage);
router1.route('/:message_id').get(getMessage).delete(deleteMessage).put(editMessage);

// prefix - /api/messages/:message_id
router2.route('/:message_id').put(editMessage);

module.exports.router1 = router1;
module.exports.router2 = router2;
const express = require("express");
// mergeParams will allows to get access to the id inside of his router
const router = express.Router({ mergeParams: true });

const { getUser, editUser } = require("../handlers/users");

// prefix - /api/users/:id
router.route("/:user_id").get(getUser).put(editUser);

module.exports = router;

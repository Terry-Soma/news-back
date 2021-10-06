const express = require("express");
const router = express.Router();

const {createUser, getUsers, getUserById, deleteUser,updateUser,} = require('../controller/_user');

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
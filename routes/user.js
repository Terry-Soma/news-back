const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/_protect");
const { createUser, getUsers, getUserById, deleteUser, updateUser, AuthController, getUserNews, userAuth } = require('../controller/_user');

router.route('/:id').get(getUserById); /* people check publisher's information*/
router.route('/').post(createUser);


router.route('/oauth/').post(AuthController);
router.use(protect);
router.route('/news').post(getUserNews);
router.route('/').get(getUsers);
router.route('/current-user').post(userAuth);

// router.post(authorize("Admin", "Redakts"), createUser);
router.put(authorize("Admin", "Redakts", "Journalist"), updateUser).delete(authorize("Admin", "Redakts"), deleteUser);
module.exports = router;
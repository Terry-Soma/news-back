const express = require("express");
const router = express.Router();

const { createNews, getNews, getNewsByUrl, updateNewsById, deleteNews } = require('../controller/_news');
const { protect, authorize } = require("../middleware/_protect");

router.route('/').get(getNews)
router.route('/:url').get(getNewsByUrl);

router.use(protect);

router.route('/').post(authorize("Admin", "Redakts", "Journalist"), createNews);
router.route('/:id').put(authorize("Admin", "Redakts", "Journalist"), updateNewsById).delete(authorize("Admin", "Redakts", "Journalist"), deleteNews);
module.exports = router;
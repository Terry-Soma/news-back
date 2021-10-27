const express = require("express");
const router = express.Router();
const formidable = require('express-formidable');/* form data */
const { createNews, getNews, getNewsByUrl, updateNewsById, uploadImage, deleteNews } = require('../controller/_news');
const { protect, authorize } = require("../middleware/_protect");

router.route('/').get(getNews)
router.route('/:url').get(getNewsByUrl);

router.use(protect);
router.route('/upload-image').post(formidable({ maxFileSize: 5 * 1024 * 1024 }), uploadImage);
router.route('/').post(createNews);

// router.route('/').post(authorize("Admin", "Redakts", "Journalist"), createNews);
router.route('/:id').put(authorize("Admin", "Redakts", "Journalist"), updateNewsById).delete(authorize("Admin", "Redakts", "Journalist"), deleteNews);
module.exports = router;
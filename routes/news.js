const express = require("express");
const router = express.Router();

const {createNews,getNews,getNewsByUrl,updateNewsById} = require('../controller/_news');

router.route('/').get(getNews).post(createNews);
router.route('/:url').get(getNewsByUrl);
router.route('/:id').put(updateNewsById);
module.exports = router;
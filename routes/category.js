const express = require("express");
const router = express.Router();

const {createCategory,getCategories,getCategoryById, updateCategory,deleteCategory} = require('../controller/_category');

router.route('/').get(getCategories).post(createCategory);

router.route('/:id').get(getCategoryById).put(updateCategory).delete(deleteCategory);
module.exports = router;    
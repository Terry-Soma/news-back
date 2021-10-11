const express = require("express");
const router = express.Router();

const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controller/_category');
const { protect, authorize } = require('../middleware/_protect');

router.route('/').get(getCategories);
router.route('/:id').get(getCategoryById);

router.use(protect);
router.route('/').post(authorize("Redakts", "Admin"), createCategory);
router.route('/:id').put(authorize("Redakts", "Admin"), updateCategory).delete(authorize("Redakts", "Admin"), deleteCategory);
module.exports = router;
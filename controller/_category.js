const Category = require('../models/Category');
const MyError = require('../utils/_errorCatch');
const asyncHandler = require('../middleware/_asyncHandler');


exports.createCategory = asyncHandler(async (req, res, next) => {
    /* check  Admin Redakts */
    const category = await Category.create(req.body);
    res.status(200).json({
        success: true,
        data: category,
    });
});

exports.getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    if (!categories) {
        throw new MyError("Empty !!!", 404);
    }
    res.status(200).json({
        success: true,
        data: categories,
    });
});

exports.getCategoriesPublisher = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().select("name");
    if (!categories) {
        throw new MyError("Empty !!!", 404);
    }
    res.status(200).json({
        success: true,
        data: categories,
    });
});

exports.getCategoryById = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).populate("News");

    if (!category) {
        throw new MyError(req.params.id + " id not found !!! ", 404);
    }
    res.status(200).json({
        success: true,
        data: category
    })
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!category) {
        throw new MyError(req.params.id + " id not found !!", 404);
    }
    res.status(200).json({
        success: true,
        data: category
    })

});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        throw new MyError(req.params.id + " id not found !!", 404);
    }
    category.remove();

    res.status(200).json({
        success: true,
        data: category
    })
});
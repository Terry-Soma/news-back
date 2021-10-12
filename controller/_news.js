const News = require('../models/News');
const MyError = require('../utils/_errorCatch');
const asyncHandler = require('../middleware/_asyncHandler');
const Category = require('../models/Category');
const { populate } = require('../models/News');


exports.createNews = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.body.category);

    if (!category) {
        throw new MyError(req.body.category + " id not found ", 400);
    }
    const news = await News.create(req.body);

    res.status(200).json({
        success: true,
        date: news
    });
});

exports.getNews = asyncHandler(async (req, res, next) => {
    // const news = await News.find().populate("journalist", { "_id": 0, "createdAt": 0, "role": 0, lname: 0, fname: 0 });
    const news = await News.find().populate(["journalist", "category"]);

    if (!news) {
        throw new MyError("Empty", 400);
    }
    res.status(200).json({
        success: true,
        data: news
    })
});

exports.getNewsByUrl = asyncHandler(async (req, res, next) => {
    const news = await News.findOne({ uniqueUrl: req.params.url });
    if (!news) {
        throw new MyError(req.params.url + "not found", 404);
    }
    res.status(200).json({
        success: true,
        data: news
    })
});
exports.updateNewsById = asyncHandler(async (req, res, next) => {
    const news = await News.findById(req.params.id);

    if (!news) {
        res.status(400).json({
            success: false,
            data: req.params.id + " not found"
        })
        throw new MyError(req.params.id + " not found", 404);
    }
    /* check redakts admin */


    if ((news.journalist.toString() !== req.userId && req.userRole !== "Redakts") || (req.userRole !== "Redakts" || req.userRole !== "Admin")) {
        res.status(401).json({
            success: false,
            data: "Таын эрх хүрэхгүй байна уу даа !! "
        });
        throw new MyError("Таны бичсэн мэдээ биш байна !!!", 400);
    }

    res.status(200).json({
        success: true,
        data: news
    })

});

/* useless */
exports.getNewsByCategory = asyncHandler(async (req, res, next) => {



});

exports.deleteNews = asyncHandler(async (req, res, next) => {

    const news = await News.findById(req.params.id);

    if (!news) {
        throw new MyError(req.params.id + "not found !", 400);
    }

    if ((news.journalist.toString() !== req.userId && req.userRole !== "Redakts") || (req.userRole !== "Redakts" || req.userRole !== "Admin")) {
        res.status(401).json({
            success: false,
            data: "Таын эрх хүрэхгүй байна уу даа !! "
        });
        throw new MyError("Таны бичсэн мэдээ биш байна !!!", 400);
    }

    news.remove();
    res.status(200).json({
        success: true,
        data: news
    })

});
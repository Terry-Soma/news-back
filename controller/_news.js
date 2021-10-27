const News = require('../models/News');
const MyError = require('../utils/_errorCatch');
const asyncHandler = require('../middleware/_asyncHandler');
const Category = require('../models/Category');

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

exports.createNews = asyncHandler(async (req, res, next) => {
    // const category = await Category.findById(req.body.category);
    console.log(req.body);

    const { image, dog: content, title, categoryId } = req.body;

    if (!content.length) {
        throw new MyError("Content is required ", 400);
    }
    if (!title) {
        throw new MyError("Title is required", 400);
    }
    if (!categoryId) {
        throw new MyError("Category is required", 400);
    }

    const news = new News({ title, image, category: categoryId, content, journalist: req.userId });
    if (!news) {
        throw new MyError("Cannot create News !!!", 500);
    }
    await news.save();
    res.status(200).json({
        success: true,
        data: news
    });


    // if (!category) {
    // throw new MyError(req.body.category + " id not found ", 400);
    // }
    /* destructing */
    // const news = await News.create(req.body);
    // const news = new News({ title, });


    // res.status(200).json({
    //     success: true,
    //     date: news
    // });


});

exports.getNews = asyncHandler(async (req, res, next) => {
    const news = await News.find().populate("journalist", "name imageUrl").populate("category", "name");
    // console.log(req.headers.authorization);
    // const news = await News.find();
    if (!news) {
        throw new MyError("Empty", 400);
    }
    res.status(200).json({
        success: true,
        data: news
    })
});

exports.getNewsByUrl = asyncHandler(async (req, res, next) => {
    const news = await News.findOne({ uniqueUrl: req.params.url }).populate("journalist", "name imageUrl");
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

/* imageUpload */

exports.uploadImage = asyncHandler(async (req, res, next) => {
    /* auth */
    /*if ((req.userRole !== "Redakts" || req.userRole !== "Admin" || req.userRole !== "Journalist")) {
        throw new MyError("Таны бичсэн мэдээ биш байна !!!", 401);
    }*/
    console.log("req--- file ====>>>>>", req.files);
    const result = await cloudinary.uploader.upload(req.files.image.path);
    if (!result) {
        throw new MyError("Алдаа гарлаа ", 500);
    }
    console.log(result);
    res.status(200).json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id
    });
});

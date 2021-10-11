const User = require('../models/User');
const MyError = require('../utils/_errorCatch');
const asyncHandler = require('../middleware/_asyncHandler');

const { verify } = require('../middleware/_googleOath');
exports.createUser = asyncHandler(async (req, res, next) => {

    const user = await User.create(req.body);

    res.status(200).json({
        success: true,
        data: user
    });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
    /* only Journalist */
    const users = await User.find({ "role": "Journalist" });
    // const users = await User.find();

    /* check */

    if (!users) {
        throw new MyError("Empty !!!", 400);
    }
    res.status(200).json({
        success: true,
        data: users
    });
});

exports.getUserById = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ $and: [{ "_id": req.params.id }, { "role": "Journalist" }] });
    /* check */
    if (!user) {
        throw new MyError("Empty !!!", 400);
    }
    res.status(200).json({
        success: true,
        data: user
    });
});

exports.updateUser = asyncHandler(async (req, res, next) => {

    /* check redakts  journal admin */

    const user = await User.findById(req.params.id);

    if (!user) {
        throw new MyError(req.params.id + " id not found !!!", 400);
    }
    for (let attr in req.body) {
        user[attr] = req.body[attr];
    }
    user.save();
    res.status(200).json({
        success: true,
        date: user
    });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {

    /* check redakts  journal admin */

    const user = await User.findById(req.params.id);

    if (!user) {
        throw new MyError(req.params.id + " id not found !!!", 400);
    }
    user.remove();
    res.status(200).json({
        success: true,
        date: user
    });
});

/* google oauth */
exports.AuthController = asyncHandler(async (req, res, next) => {
    if (!req.body.token) {
        throw new MyError("Уучлаарай таны хүсэлтэнд  хариулах зүйл алга", 404);
    }
    let token = req.body.token;
    const { email, email_verified } = await verify(token);

    if (!email_verified) {
        throw new MyError("Уучлаарай та ямар нэгэн зүйл буруу хийж байна. Хаа саагүй нүд бий шүү", 403);
    }
    const user = await User.findOne({ email }).select({ "role": 1, "email": 1, "_id": 1 });
    if (!user) {
        throw new MyError("Уучлаарай та нэвтрээгүй байна", 401)
    }

    const userToken = user.getToken();
    console.log(userToken);
    const cookieOption = {
        expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
        httpOnly: true,
    }
    res.status(200).cookie("news-token", token, cookieOption).json({
        success: true,
        token: userToken,
    });
});
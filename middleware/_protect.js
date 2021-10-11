const jwt = require("jsonwebtoken");
const MyError = require("../utils/_errorCatch");
const asyncHandler = require("./_asyncHandler");
exports.protect = asyncHandler(async (req, res, next) => {
    let token = null;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];

    } else if (req.cookies) {
        token = req.cookies["News-token"];

    }
    if (!token) {
        res.status(401).json({
            success: false,
            data: "Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна"
        });
        throw new MyError("Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна", 401);
    }

    const obj = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = obj.id;
    req.userRole = obj.role;
    req.email = obj.email;
    next();
});

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            throw new MyError("Таны эрх хүрэхгүй байнаа " + req.userRole, 403);
        }
    }
}
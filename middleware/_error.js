const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    const error = { ...err };/* copy uusgeh */
    error.message = err.message;
    if (error.name === "CastError") {
        error.message = "Энэ ID -г ойлгож чадахгүй байна.";
        error.statusCode = 400;
    }
    if (error.code === 11000) {
        error.message = "Давхардсан утга байна";
        error.statusCode = 400;
    }
    if (error.name === "JsonWebTokenError" && error.message === "invalid signature") {
        error.message = "Буруу токен ирлээ";
        error.statusCode = 400;
    }



    res.status(error.statusCode || 500).json({
        success: false,
        error,
    });
};
module.exports = errorHandler;
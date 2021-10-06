const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Категорийн нэрийг оруулна уу"],
        unique: true,
        trim: true,
        maxlength: [40, "Категорийн нэрийн урт хэтэрлээ 40 тэмдэгт байх учиртай ...."],
    },
    action: String,/* href ?? !! */
    categoryContent: {
        type: String,
        /* meta keywords */
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

CategorySchema.virtual("News",{
    ref: "News",
    localField : "_id",
    foreignField : "category",
    justOne : false
})

module.exports = mongoose.model("Category", CategorySchema);
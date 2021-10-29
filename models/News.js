const mongoose = require("mongoose");
const uniqueSlug = require('unique-slug');
const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Гарчиг оруулна уу"],
        trim: true,
        maxlength: [130, "Гарчигийн урт хэтэрлээ Хамгийн ихдээ 130 тэмдэгт байх учиртэй"],
        unique: true
    },
    category: {
        /* relation */
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    journalist: {
        /* relation */
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    favCount: Number,
    // smallPicUrl: {
    //     type: String,
    //     default: "https://images.unsplash.com/photo-1627780538512-4bf5b6bdff10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
    //     required: true,
    // },
    image: {
        url: String,
        public_id: String,
    },
    isLive: {
        type: Boolean,
        default: false
    },

    state: {
        type: Boolean,
        default: false
    },
    // otype: {
    //     type: String,
    //     required: [true, " Type оруулна уу"],
    //     enum: ["L", "S", "X", "M"],
    //     default: "S"
    // },
    content: {
        type: {},
        required: [true, "Агуулгаа оруулна уу"],
    },
    Ognoo: {
        type: Date,
        default: Date.now
    },
    commentCount: Number,
    shareCount: Number,
    uniqueUrl: {
        type: String,
        unique: true,
        trim: true,
        maxlength: [10, "Url Хаяг хэтэрлээ"]
    },
    viewedCount: Number,
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)



NewsSchema.pre("save", function (next) {
    this.uniqueUrl = uniqueSlug();
    next();
});

module.exports = mongoose.model("News", NewsSchema);

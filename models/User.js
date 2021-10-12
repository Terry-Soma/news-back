const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [50, "Нэрийн урт хэтэрлээ"]
  },
  lname: {
    type: String,
    required: [true, "Овгоо оруулна уу"],
    maxlength: [50, "Нэрийн урт хэтэрлээ"]
  },
  fname: {
    type: String,
    required: [true, "Нэрээ оруулна уу"],
    maxlength: [50, "Нэрийн урт хэтэрлээ"]
  },

  email: {
    type: String,
    required: [true, "Хэрэглэгчийн имэйл хаягийг оруулна уу"],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "И-мэйл хаяг буруу байна",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: [true, "Хэрэглэгчийн эрхийг оруулна уу"],
    enum: ["Redakts", "Journalist"],
    default: "Journalist"
  },
  imageUrl: {
    type: String,
    default: "no-photo.jpg",
  },
  bannerImage: {
    type: String,
    default: "no-banner.jpg",
  },
  facebook: String,
  twitter: String,
  job: {
    type: String,
    trim: true,
    maxlength: [50, "Мэргэжлийн талаар мэдээллээ оруулна уу"]
  }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual("journalist", {
  ref: "News",
  localField: "_id",
  foreignField: "journalist",
  justOne: false
});

UserSchema.pre("save", function (next) {
  this.name = `${this.lname[0]}.${this.fname}`;
  next();
});
UserSchema.methods.getToken = function () {
  const token = jwt.sign({
    email: this.email, role: this.role, id: this._id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN
  });
  return token;
}

module.exports = mongoose.model("User", UserSchema);

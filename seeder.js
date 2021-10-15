const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// const Category = require('./models/Category');
const News = require('./models/News');
// const User = require('./models/User');

dotenv.config({ path: './config/config.env' });
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
/* file read into massive */
const news = JSON.parse(fs.readFileSync(__dirname + '/data/news.json', 'utf-8'));
// const books = JSON.parse(fs.readFileSync(__dirname+'/data/book.json','utf-8')); 

// const user = JSON.parse(fs.readFileSync(__dirname+'/data/user.json','utf-8')); 

const importData = async () => {
    try {
        //   await Category.create(categories);
        //   await Book.create(books);
        await News.create(news);

        console.log("Success import");
    } catch (err) {

        console.log(err);
    }
}
const deleteData = async () => {
    try {
        await News.deleteMany();
        // await Book.deleteMany();
        // await User.deleteMany();

        console.log("Success delete");
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] == '-i') {
    importData();
} else if (process.argv[2] == '-d') {
    deleteData();
}
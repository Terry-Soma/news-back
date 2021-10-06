const mongoose = require("mongoose");
const MongodbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const connectDb = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI, MongodbOption);
    console.log(`Mongodb connection ${conn.connection.host}`);
}
module.exports = connectDb;

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path : './config/config.env'});

/* log */
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const logger = require('./middleware/_mylog');

/*Error */
const errorHandler = require('./middleware/_error');

/* routes */
const categoriesRoutes = require('./routes/category');
const newsRoutes = require('./routes/news');
const userRoutes = require('./routes/user');
/* routes-end */

/* connect db */
const connectDB = require('./config/_db');
connectDB();
/* connect db end */
const app = express();
app.use(express.json());

/* log */
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

app.use(logger);/* mylog */
app.use(morgan('combined', { stream: accessLogStream }))
/* log-end */


app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.use('/api/v1/categories',categoriesRoutes);
app.use('/api/v1/news',newsRoutes);
app.use('/api/v1/user',userRoutes);


/* error */
app.use(errorHandler);


 const server =  app.listen(process.env.PORT, () => {
    console.log(`Example app listening at ${process.env.PORT}`)
  })
/* error handling and server.close() */
process.on("unhandledRejection",(err,promise)=>{
  console.log(`Error !!!, ${err.message}`);
  server.close(()=>{
    process.exit(1);
  })
})
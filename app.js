const express = require('express');
const dotenv = require('dotenv');
const config = dotenv.config({
  path: './config/config.env'
});

const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const requestIp = require('request-ip');
const expressip = require('express-ip');
const connectDB = require('./config/dbConnect');
const http = require('http');
const https = require('https');

const mongoSanitizer = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');

connectDB();

const customPC = require('./routes/customer/categories');
const filterList = require('./routes/customer/filters');
const synch = require('./routes/customer/sync');
const users = require('./routes/admin/user');
const products = require('./routes/admin/products');
const app = express();

app.use(express.json({'limit': '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(mongoSanitizer());
app.use(helmet());
app.use(xss());
app.use(requestIp.mw());
app.use(expressip().getIpInfoMiddleware);
app.use(cors());
app.use(express.static('public'));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use('/api/customer/category', customPC);
app.use('/api/customer/filter', filterList);
app.use('/api/customer/sync', synch);
app.use('/api2/admin/', users);
app.use('/api2/admin/products', products);

app.get('/', async (req, res, next) => {
  res.status(200).send('Welcome to the ForgePC');
});

const port = process.env.PORT || 80;

http.createServer(app).listen(port,
  function() {
    console.log(
      `App running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold
    );
  });

process.on('unhandledRejection', (err, promise) => {
  console.log(`UnhandledRejection: ${err.message}`.red.bold);
  // Close App
  if (process.env.NODE_ENV !== 'production') {
    //server.close(() => process.exit(1));
  }
});


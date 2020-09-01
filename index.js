// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();
let router = require('express').Router();

// Import routes
let orderRoutes = require('./routes/order-routes');
let HttpError = require('./models/http-error');

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Connect to frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

// Connect to Mongoose and set connection variable
mongoose.connect(
  'mongodb+srv://filipa:Filipa0802@cluster0-bmw5h.gcp.mongodb.net/zavrsni?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
);
var db = mongoose.connection;
// Added check for DB connection
if (!db) console.log('Error connecting db');
else console.log('Db connected successfully');

// Setup server port
var port = process.env.PORT || 5000;

// Use Api routes in the App
app.use('/api/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// Launch app to listen to specified port
app.listen(port, function () {
  console.log('Running RestHub on port ' + port);
});

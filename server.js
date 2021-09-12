const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const appconfig = require('./config/index');
const auth = require('./routes/auth');
const blogs = require('./routes/blogs');

// Initializing express and cookie parser
var app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', auth);
app.use('/blogs', blogs);

// Creating the db connection
mongoose
  .connect(appconfig.dbUri)
  .then(() => console.log('Mongodb connection successful'))
  .catch(err => console.log(err));

// 3000 port in development
app.listen(appconfig.port, '0.0.0.0', () => {
    console.log('Server is running at ', appconfig.port);
});

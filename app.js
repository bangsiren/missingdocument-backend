const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload')
const mongoose = require('./db');
const userRoutes = require('./routes/users_router');


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// // parse application/x-www-form-urlencoded

// // parse application/json
app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
// app.use(fileUpload());
// app.use('/users', userRoutes)
app.use(userRoutes)

app.listen(process.env.PORT ? process.env.PORT : 3000, (er) => {
  if (er) {
    console.log(er + "The server not running")
  } else {
    console.log('Server running on port: 3000');
  }
});

module.exports = app;
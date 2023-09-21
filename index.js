const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const studentRoutes = require('./routes/form');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use("/form/registration", studentRoutes);

app.use(cookieParser());

app.use('/auth', authRoutes);

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

app.get("/form", function( req, res ) {
  res.render(__dirname+'/views/form.ejs');
});

app.get("/", function( req, res ) {
  res.render(__dirname+'/views/home.ejs');
});

app.get("/login", ( req, res ) => {
  if ( req.cookies.accessToken ) {
    try {
      var isTokenValid = jwt.verify( req.cookies.accessToken, "userLoginCredentials___786" );
      res.redirect('/form');
    } catch {};
  };

  res.render(__dirname + "/views/login.ejs");
});

app.get('/form', ( req, res ) => {
  if ( req.cookies.accessToken ) {
    try {
      var isTokenValid = jwt.verify( req.cookies.accessToken, "userLoginCredentials___786" );
      console.log( isTokenValid );
    } catch {
      res.redirect('/login');
    };
  } else {
    res.redirect('/login');
  };

  res.render( __dirname + "/views/form.ejs" );
});

mongoose.connect("mongodb+srv://mdiqbal00037:Danish-73@students.ir24p0i.mongodb.net/students?retryWrites=true&w=majority").then((res) => {
    console.log("Database Connection established");
}).catch((error) => {
    console.log(error.message);
});

app.listen(port, () => {
  console.log("Server is running...");
});
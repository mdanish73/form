const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const studentRoutes = require('./routes/form');
const mongoose = require('mongoose');

app.use(express.json());
app.use("/form/registration", studentRoutes);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/form", function(req, res) {
  res.render('form');
});

mongoose.connect("mongodb+srv://mdiqbal00037:Danish-73@students.ir24p0i.mongodb.net/students?retryWrites=true&w=majority").then((res) => {
    console.log("Database Connection established");
}).catch((error) => {
    console.log(error.message);
});

app.listen(port, () => {
  console.log("Server is running...");
});
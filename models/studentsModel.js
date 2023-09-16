const mongoose = require('mongoose');

const studentsModel = mongoose.model('Students', new mongoose.Schema({
    studentName: String,
    fatherName: String,
    studentAge: Number,
    studentGender: String,
    studentPhone: Number
}));

module.exports = studentsModel;
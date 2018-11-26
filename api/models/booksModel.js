const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    cwid: String,
	cover: String,
	isbn: String,
	title: String,
    author: String,    
    copies: Number,
	genre: String,
	length: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);

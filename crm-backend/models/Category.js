// models/User.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  company: { type: String, required: true },
  category: { type: String, required: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

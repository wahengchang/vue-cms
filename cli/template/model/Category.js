const mongoose = require('mongoose');
const {POSTYPE_NAME} = require('../const')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},
{ timestamps: true } // Enable timestamps for createdAt and updatedAt fields
);

const CategoryModel = mongoose.model(`${POSTYPE_NAME}Category`, categorySchema);

module.exports = CategoryModel;
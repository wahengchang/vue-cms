const mongoose = require('mongoose');
const {POSTYPE_NAME} = require('../const')

const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `${POSTYPE_NAME}Category`,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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

const PosttypeModel = mongoose.model(POSTYPE_NAME, modelSchema);

module.exports = PosttypeModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: add item history / logs
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ItemArr: {
    type: Array,
    default: [],
  },
});

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;

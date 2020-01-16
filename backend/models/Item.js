const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: add item history / logs
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dateLastUpdated: {
    type: Date,
    default: Date.now(),
  },
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;

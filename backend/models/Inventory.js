const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: [ItemSchema],
});

//TODO: add item history / logs
const InventorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categories: [CategorySchema],
});

const Inventory = mongoose.model('inventory', InventorySchema);

module.exports = Inventory;

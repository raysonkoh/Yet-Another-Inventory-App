const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: add item history / logs
const InventorySchema = new Schema({
  CatArr: {
    type: Array,
    default: [],
  },
});

const Inventory = mongoose.model('inventory', InventorySchema);

module.exports = Inventory;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: add item history / logs
const InventorySchema = new Schema({
  catArr: {
    type: Array,
    default: [],
  },
});

const Inventory = mongoose.model('inventory', InventorySchema);

module.exports = Inventory;

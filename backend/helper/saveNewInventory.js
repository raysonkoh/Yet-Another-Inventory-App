const Inventory = require('../models/Inventory');

function saveNewInventory(inventoryName) {
  const newInventory = new Inventory({
    name: inventoryName,
  });
  return newInventory.save();
}

module.exports = saveNewInventory;

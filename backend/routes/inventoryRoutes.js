const express = require('express');
const inventoryRoutes = express.Router();
const Inventory = require('../models/Inventory');
const auth = require('../middlewares/auth');
const saveNewInventory = require('../helper/saveNewInventory');

// new inventory
inventoryRoutes.post('/new', (req, res) => {
  const {inventoryName} = req.body.data;
  saveNewInventory(inventoryName)
    .then(invt =>
      res.status(200).json({
        msg: 'Successfully saved new inventory!',
        invt,
      }),
    )
    .catch(err => console.log(err));
});

// new item
inventoryRoutes.post('/item/new', auth, (req, res) => {
  const {
    inventoryId,
    catId,
    categoryName,
    categoryDescription,
    itemName,
    itemDescription,
    itemQuantity,
  } = req.body.data;

  Inventory.findById(inventoryId)
    .then(inventory => {
      if (catId) {
        //existing category
        const category = inventory.categories.id(catId);
        category.items.push({
          name: itemName,
          description: itemDescription,
          quantity: itemQuantity,
        });
        inventory.save().then(invt =>
          res.status(200).json({
            msg: 'Successfully added item in existing category',
            invt,
          }),
        );
      } else {
        //new category
        inventory.categories.push({
          name: categoryName,
          description: categoryDescription,
          items: [
            {
              name: itemName,
              description: itemDescription,
              quantity: itemQuantity,
            },
          ],
        });
        inventory.save().then(invt =>
          res.status(200).json({
            msg: 'Successfully added item in new category',
            invt,
          }),
        );
      }
    })
    .catch(err => console.log(err));
});

// delete item
inventoryRoutes.delete('/item/delete', auth, (req, res) => {
  const {inventoryId, catId, itemId} = req.body;
  Inventory.findById(inventoryId)
    .then(inventory => {
      if (inventory) {
        inventory.categories
          .id(catId)
          .items.id(itemId)
          .remove();
        inventory.save().then(invt =>
          res.status(200).json({
            msg: 'Successfully deleted item',
            invt,
          }),
        );
      } else {
        res.status(400).json({
          msg: 'Invalid inventory',
        });
      }
    })
    .catch(err => console.log(err));
});

// modify an item (name, description or quantity)
inventoryRoutes.patch('/item/modify', auth, (req, res) => {
  const {
    inventoryId,
    catId,
    itemId,
    newItemName,
    newItemDescription,
    newItemQuantity,
  } = req.body.data;

  Inventory.findById(inventoryId)
    .then(inventory => {
      if (inventory) {
        const item = inventory.categories.id(catId).items.id(itemId);
        item.name = newItemName;
        item.description = newItemDescription;
        item.quantity = newItemQuantity;
        inventory.save().then(invt =>
          res.status(200).json({
            msg: 'Successfully modified item!',
            invt,
          }),
        );
      } else {
        res.status(400).json({
          msg: 'Invalid inventory',
        });
      }
    })
    .catch(err => console.log(err));
});

// find all categories available
inventoryRoutes.get('/:inventoryId/category/all', auth, (req, res) => {
  const {inventoryId} = req.params;
  Inventory.findById(inventoryId)
    .then(inventory => {
      if (inventory) {
        const categories = [];
        for (let i = 0; i < inventory.categories.length; i++) {
          if (inventory.categories[i].items.length > 0) {
            categories.push(inventory.categories[i]);
          }
        }

        res.status(200).json({
          msg: 'Successfully retrieved all categories in the inventory',
          categories,
        });
      } else {
        res.status(400).json({
          msg: 'Invalid inventory',
        });
      }
    })
    .catch(err => console.log(err));
});

/*
// find items using its item id
itemRoutes.get('/find/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  Item.findById(itemId)
    .then(item => {
      if (!item) {
        res.status(400).json({
          msg: 'Invalid item id',
        });
      } else {
        res.status(200).json({
          msg: 'Item found',
          item,
        });
      }
    })
    .catch(err => console.log(err));
});

// find items according to existing category
inventoryRoutes.get('/:categoryName', (req, res) => {
  const categoryName = req.params.categoryName;
  Category.findOne({name: categoryName})
    .then(category => {
      if (!category) {
        res.status(400).json({
          msg: 'No such category',
        });
      } else {
        res.status(200).json({
          msg: 'Found category',
          category,
        });
      }
    })
    .catch(err => console.log(err));
});
*/

module.exports = inventoryRoutes;

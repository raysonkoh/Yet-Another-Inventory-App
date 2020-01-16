const express = require('express');
const inventoryRoutes = express.Router();
const Inventory = require('../models/Inventory');
const Category = require('../models/Category');
const Item = require('../models/Item');

/*
router.get('/search', (req, res) => {
  const {category} = req.body.data;
  Inventory.find({category: category})
    .then(itemList =>
      res.status(200).json({
        itemList,
      }),
    )
    .catch(err => console.log(err));
});
*/

inventoryRoutes.get('/test', (req, res) => {
  res.status(200).json({
    msg: 'Hello world!',
  });
});

inventoryRoutes.post('/new', (req, res) => {
  const newInventory = new Inventory({});
  newInventory
    .save()
    .then(inventory => {
      res.status(200).json({
        msg: 'Successfully saved inventory!',
      });
    })
    .catch(err => console.log(err));
});

inventoryRoutes.post('/category/new', (req, res) => {
  const {name, description} = req.body;
  const newCategory = new Category({name, description});
  newCategory
    .save()
    .then(category => {
      res.status(200).json({
        msg: 'Successfully saved category!',
      });
    })
    .catch(err => console.log(err));
});

inventoryRoutes.post('/item/new', (req, res) => {
  const {name, description, quantity} = req.body;
  const newItem = new Item({name, description, quantity});
  newItem
    .save()
    .then(item => {
      res.status(200).json({
        msg: 'Successfully saved item!',
      });
    })
    .catch(err => console.log(err));
});

module.exports = inventoryRoutes;

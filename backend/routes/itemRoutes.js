const express = require('express');
const itemRoutes = express.Router();
const Category = require('../models/Category');
const Item = require('../models/Item');

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

// new item in an existing category
itemRoutes.post('/new', (req, res) => {
  const {catId, itemName, itemDescription, itemQuantity} = req.body;

  const newItem = new Item({
    name: itemName,
    description: itemDescription,
    quantity: itemQuantity,
  });

  Category.findById(catId)
    .then(cat => {
      if (!cat) {
        res.status(400).json({
          msg: 'The category that was specified was not found',
        });
      } else {
        newItem.save().then(item => {
          cat.itemArr.push(item);
          cat.save().then(result =>
            res.status(200).json({
              msg: 'Successfully saved new item in an existing category!',
            }),
          );
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = itemRoutes;

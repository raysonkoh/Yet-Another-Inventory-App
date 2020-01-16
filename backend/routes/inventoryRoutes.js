const express = require('express');
const inventoryRoutes = express.Router();
const Category = require('../models/Category');
const Item = require('../models/Item');

// find items using its item id
inventoryRoutes.get('/find/:itemId', (req, res) => {
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
inventoryRoutes.get('/findCategory/:categoryName', (req, res) => {
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

// find all categories available
inventoryRoutes.get('/findCategories', (req, res) => {
  Category.find({})
    .then(catArr =>
      res.status(200).json({
        msg: 'Successfully fetched all categories!',
        catArr,
      }),
    )
    .catch(err => console.log(err));
});

// new item in a new category
inventoryRoutes.post('/new', (req, res) => {
  const {
    categoryName,
    categoryDescription,
    itemName,
    itemDescription,
    itemQuantity,
  } = req.body;

  const newItem = new Item({
    name: itemName,
    description: itemDescription,
    quantity: itemQuantity,
  });

  newItem
    .save()
    .then(item => {
      const data = [item];
      const newCategory = new Category({
        name: categoryName,
        description: categoryDescription,
        itemArr: data,
      });

      newCategory.save().then(category => {
        res.status(200).json({
          msg: 'Successfully saved new item in a new category!',
        });
      });
    })
    .catch(err => console.log(err));
});

// new item in an existing category
inventoryRoutes.post('/new/:categoryName', (req, res) => {
  const categoryName = req.params.categoryName;
  const {itemName, itemDescription, itemQuantity} = req.body;

  const newItem = new Item({
    name: itemName,
    description: itemDescription,
    quantity: itemQuantity,
  });

  Category.findOne({name: categoryName})
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

module.exports = inventoryRoutes;

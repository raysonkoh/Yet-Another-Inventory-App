const express = require('express');
const categoryRoutes = express.Router();
const Category = require('../models/Category');
const Item = require('../models/Item');

categoryRoutes.delete('/delete', (req, res) => {
  const {catId, itemId} = req.body;
  Category.findById(catId)
    .then(cat => {
      Item.findByIdAndDelete(itemId).then(() => {
        for (let i = 0; i < cat.itemArr.length; i++) {
            console.log(cat.itemArr[i]._id);
          if (cat.itemArr[i]._id == itemId) {
            cat.itemArr.splice(i, 1);
            break;
          }
        }
          cat.save();
        res.status(200).json({
          msg: 'Successfully deleted item!',
        });
      });
    })
    .catch(err => console.log(err));
});

// find all categories available
categoryRoutes.get('/all', (req, res) => {
  Category.find({})
    .then(catArr =>
      res.status(200).json({
        msg: 'Successfully fetched all categories!',
        catArr,
      }),
    )
    .catch(err => console.log(err));
});

// find items according to existing category
categoryRoutes.get('/:categoryName', (req, res) => {
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

// new item in a new category
categoryRoutes.post('/new', (req, res) => {
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

module.exports = categoryRoutes;

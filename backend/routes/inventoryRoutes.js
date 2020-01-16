const express = require('express');
const inventoryRoutes = express.Router();
const Category = require('../models/Category');
const Item = require('../models/Item');
const categoryRoutes = require('./categoryRoutes');
const itemRoutes = require('./itemRoutes');

inventoryRoutes.use('/category', categoryRoutes);
inventoryRoutes.use('/items', itemRoutes);

module.exports = inventoryRoutes;

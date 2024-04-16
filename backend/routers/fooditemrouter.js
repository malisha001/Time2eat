const express = require('express');
const router = express.Router();
const { FoodItemModel } = require('../models/foodItemModel.js');
const handler = require('express-async-handler');




router.get(
    '/',
    handler(async (req, res) => {
      const foods = await FoodItemModel.find({});   //root api
      res.send(foods);
    })
  );
  router.get(
    '/tags',
    handler(async (req, res) => {
      const tags = await FoodItemModel.aggregate([
        {
          $unwind: '$tags',
        },
        {
          $group: {
            _id: '$tags',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            name: '$_id',
            count: '$count',
          },
        },
      ]).sort({ count: -1 });
  
      const all = {
        name: 'All',
        count: await FoodItemModel.countDocuments(),
      };
  
      tags.unshift(all);
  
      res.send(tags);
    })
  );
  
  router.get(
    '/search/:searchTerm',
    handler(async (req, res) => {
      const { searchTerm } = req.params;
      const searchRegex = new RegExp(searchTerm, 'i');
  
      const foods = await FoodItemModel.find({ name: { $regex: searchRegex } });
      res.send(foods);
    })
  );
  
  router.get(
    '/tag/:tag',
    handler(async (req, res) => {
      const { tag } = req.params;
      const foods = await FoodItemModel.find({ tags: tag });
      res.send(foods);
    })
  );
  
  router.get(
    '/:foodId',
    handler(async (req, res) => {
      const { foodId } = req.params;
      const food = await FoodItemModel.findById(foodId);
      res.send(food);
    })
  );
module.exports = router;

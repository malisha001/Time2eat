const express = require('express');
const router = express.Router();
const  FoodModel = require('../models/foodModel.js');
const handler = require('express-async-handler');
const mongoose = require('mongoose')




router.get(
    '/',
    handler(async (req, res) => {
      const foods = await FoodModel.find({});   //root api
      res.send(foods);
    })
  );
  router.get(
    '/tags',
    handler(async (req, res) => {
      const tags = await FoodModel.aggregate([
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
        count: await FoodModel.countDocuments(),
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
  
      const foods = await FoodModel.find({ name: { $regex: searchRegex } });
      res.send(foods);
    })
  );
  
  router.get(
    '/tag/:tag',
    handler(async (req, res) => {
      const { tag } = req.params;
      const foods = await FoodModel.find({ tags: tag });
      res.send(foods);
    })
  );
  
  router.get(
    '/:foodId',
    handler(async (req, res) => {
      const { foodId } = req.params;
      console.log('Food ID:', foodId);
      if (!foodId) {
        return res.status(400).send("Food ID is missing");
      }
      const food = await FoodModel.findById(foodId);
      if (!food) {
        return res.status(404).send("Food not found");
      }
      res.send(food);
    })
  );


  
module.exports = router;

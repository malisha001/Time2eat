/*const { connect, set } = require('mongoose');
const FoodModel =  require('../models/foodModel.js')
const { sample_foods } = require('../src/data.js');
//const bcrypt = require('bcryptjs');



exports.dbconnect = async () => {
  try {
     await connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
    

     await seedFoods();
      console.log('connect successfully---');
  } catch (error) {
      console.log(error);
  }
}; 



async function seedFoods() {
  try{
  const food = await FoodModel.countDocuments();
  if (food > 0) {
      console.log('Foods seed is already done!');
      return;
  }

  for (const food of sample_foods) {
      food.imageUrl = `/foods/${food.imageUrl}`;
      await FoodModel.create(food);
  }

  console.log('Foods seed Is Done!');
}catch (error) {
  console.error('Error seeding food items:', error);
}
} */

const { connect } = require('mongoose');
const FoodModel = require('../models/foodModel.js');
const { sample_foods } = require('../src/data.js');

exports.dbconnect = async () => {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await seedFoods();
    console.log('Connected to MongoDB and seeded foods successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

async function seedFoods() {
  try {
    // Check if there are already documents in the Food collection
    const foodCount = await FoodModel.countDocuments();
    if (foodCount > 0) {
      console.log('Food collection is already seeded');
      return;
    }

    // If the Food collection is empty, seed it with sample_foods data
    for (const food of sample_foods) {
      food.imageUrl = `/foods/${food.imageUrl}`;
      console.log('Food data to be seeded:', food); 
      await FoodModel.create(food);
    }

    console.log('Food collection seeded successfully');
  } catch (error) {
    console.error('Error seeding food collection:', error);
  }
}

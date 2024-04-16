const { connect, set } = require('mongoose');
const { FoodItemModel } = require('../models/foodItemModel.js');
const { sample_foods } = require('../data.js');
const bcrypt = require('bcryptjs');

//const PASSWORD_HASH_SALT_ROUNDS = 10;


exports.dbconnect = async () => {
  try {
      connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('DB connected successfully');
    await seedFoodItems();
    console.log('Foods seed is already done!');
  } catch (error) {
    console.error('DB connection error:', error);
  }
};

     /* await seedFoodItems();
      console.log('connect successfully---');
  } catch (error) {
      console.log(error);
  }
}; */

/*async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log('Users seed is done!'); 
}      */

async function seedFoodItems() {
  try{
  const fooditems = await FoodItemModel.countDocuments();
  if (fooditems > 0) {
      console.log('Foods seed is already done!');
      return;
  }

  for (const food of sample_foods) {
      food.imageUrl = `/foods/${food.imageUrl}`;
      await FoodItemModel.create(food);
  }

  console.log('Foods seed Is Done!');
}catch (error) {
  console.error('Error seeding food items:', error);
}
}
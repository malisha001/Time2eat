import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Price from '../../component/Price/Price';
import StarRating from '../../component/StarRating/StarRating';
import Tags from '../../component/Tags/Tags';
import { useCart } from '../../hooks/useCart';
import { getById } from '../../services/foodService';
import NotFound from '../../component/NotFound/NotFound';
import classes from './foodPage.module.css';
import axios from 'axios';

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate =  useNavigate();                                          //for navigate a user inside a function we use usenavigate hook

  const handleAddToCart = () => {
    addToCart(food);
    navigate('/cart');
  };



  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);
  return (
    <>
      {!food ? (<NotFound message="Food Not Found!" linkText="Back To Homepage" />
      ) : (                                                                                //check if the food is available
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${food.imageUrl}`}
            alt={food.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${                     
                  food.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>                       
              <StarRating stars={food.stars} size={25} />
            </div>

            <div className={classes.origins}>                      
              {food.origins?.map(origin => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>                          
              {food.tags && (
                <Tags
                  tags={food.tags.map(tag => ({ name: tag }))}  
                  forFoodPage={true}
                />
              )}
            </div>

            <div className={classes.cook_time}>                  
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>                
              <Price price={food.price} />
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}
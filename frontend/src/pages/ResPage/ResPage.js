import React, { useEffect , useReducer} from 'react';
import { getAll } from '../../services/foodService';
import { getAllRimages } from '../../services/RestaurantService';
import Thumbnails from '../../component/Thumbnails/Thumbnails';
import RestaurantImages from '../../component/RestaurantImages.js/RestaurantImages';

const initialState = { foods: [] , Rimages: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case 'FOODS_LOADED':
          return { ...state, foods: action.payload };
        case 'RIMAGES_LOADED':
            return { ...state,Rimages: action.payload };  
        default:
          return state;
}
};

export default function ResPage() {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const { foods, Rimages } = state;
    

  useEffect(() => {
    Promise.all([getAll(), getAllRimages()]).then(([foodsData, RimagesData]) => {
        dispatch({ type: 'FOODS_LOADED', payload: foodsData });
        dispatch({ type: 'RIMAGES_LOADED', payload: RimagesData });
    });
}, []);

 
  
  return (

    <>
    {/* Render Restaurant Images */}
 
    <RestaurantImages Rimages = {Rimages} />


    {/* Render Thumbnails for foods */}
    <Thumbnails foods = {foods} />
    
    
    
    </>
  );
}

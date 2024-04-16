import React, { useEffect , useReducer} from 'react';
import { 
  getAll,
  getAllByTag,
  getAllTags,
  search,
 } from '../../services/fooditemService';
import { getAllRimages } from '../../services/RestaurantService';
import Thumbnails from '../../component/Thumbnails/Thumbnails';
import RestaurantImages from '../../component/RestaurantImages.js/RestaurantImages';
import { useParams } from 'react-router-dom';
import Search from '../../component/Search/Search';
import Tags from '../../component/Tags/Tags.js';
import NotFound from '../../component/NotFound/NotFound';

const initialState = { foods: [] , Rimages: [] , tags: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case 'FOODS_LOADED':
          return { ...state, foods: action.payload };
        case 'RIMAGES_LOADED':
          return { ...state,Rimages: action.payload };  
        case 'TAGS_LOADED':
          return { ...state, tags: action.payload };    
        default:
          return state;
}
};

export default function ResPage() {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const { foods, Rimages,tags } = state;
    const { searchTerm, tag } = useParams();
    

  useEffect(() => {
    getAllTags().then(tags => dispatch({type: 'TAGS_LOADED', payload: tags}));

    const loadfoods = tag
    ? getAllByTag(tag)
    :searchTerm
    ?search(searchTerm)
    : getAll();

    loadfoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods}));
  }, [searchTerm, tag]);

  useEffect(() => {
    
      getAllRimages().then((RimagesData) => {
        dispatch({ type: 'RIMAGES_LOADED', payload: RimagesData });
      });
    
  }, [searchTerm]);
 
  
  return (

    <>
                                                
    <RestaurantImages Rimages = {Rimages} />                     
     
    <Search Rimages = {Rimages} />
    <Tags tags = {tags}  Rimages={Rimages} />
    {foods.length === 0 && <NotFound linkText="Reset Search" />}
    <Thumbnails foods = {foods} />                         {/* Render Thumbnails for foods */}
    
    
    
    </>
  );
}

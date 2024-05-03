import React, { useEffect , useReducer} from 'react';
import { 
  getAll,
  getAllByTag,
  getAllTags,
  search,
  getAllByRestaurantId,
 } from '../../services/foodService';

import Thumbnails from '../../component/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../component/Search/Search';
import Tags from '../../component/Tags/Tags.js';
import NotFound from '../../component/NotFound/NotFound';
import { useNavigate } from 'react-router-dom';

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case 'FOODS_LOADED':
          return { ...state, foods: action.payload };
        
        case 'TAGS_LOADED':
          return { ...state, tags: action.payload };    
        default:
          return state;
    }
};

export default function ResPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const { foods, tags } = state;
    const { searchTerm, tag } = useParams();

    useEffect(() => {
        // Fetch tags
        getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

        // Fetch foods based on restaurant ID
        if (id) {
            getAllByRestaurantId(id).then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
        } else {
            // Handle case where restaurant ID is not provided
            // You can navigate to a default page or show a message
            console.error("Restaurant ID not provided!");
        }
    }, [id]);

    return (
        <>
            <Search />
            <Tags tags={tags} />
            {foods.length === 0 && <NotFound linkText="Reset Search" />}
            <Thumbnails foods={foods} />
        </>
    );
}

import React from 'react';
import StarRating from '../StarRating/StarRating';
import classes from './restaurantimages.module.css';



export default function RestaurantImages( { Rimages}) {
    return (
        <div className={classes.rimagecontainer}>
          {Rimages.map(Rimage => (
            <div key={Rimage.id}>
              <img
                  className={classes.rimage}
                  src={`${Rimage.imageUrl}`}
                  alt={Rimage.name}
                />

                

              <div className={classes.content}>
                <div className={classes.name}>{Rimage.name}</div>
                
                <div className={classes.details}>
                <span 
                  className= {`${classes.favourite} ${Rimage.favourite ? '' : classes.not}`}
                >
                  ❤
                  </span>
                <div className={classes.stars}>
                  <StarRating stars={Rimage.stars} />
                </div>
               
                <div className={classes.locations}>
                    {Rimage.locations.map(location => (
                        <span key={location}>{location}</span>
                    ))}
                   </div>
                   </div>
                   </div>
                   </div>
             
            
          ))}
          </div>
          
           
    );
}
        
      
    
    

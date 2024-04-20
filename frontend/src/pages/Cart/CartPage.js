import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import classes from './cartPage.module.css';
import Title from '../../component/Title/Title';
import Price from '../../component/Price/Price';
import NotFound from '../../component/NotFound/NotFound';

export default function CartPage() {
   const {cart, removeFromCart,  changeQuantity } = useCart();
return (
  <>
  <Title title="Cart Page" margin="1.5rem 0 0 2.3rem" />,

  {cart.items.length === 0 ? (<NotFound message="Cart Page is empty!" />
  ) : (
     <div className={classes.container}>
        <ul className={classes.list}>
           {cart.items.map(item => (
             <li key={item.food.id}>
               <div>
                   <img 
                   src={`${item.food.imageUrl}`}   
                   alt = {item.food.name}
                />
              </div>
              <div>
                <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
              </div>

              <div>
                <select value={item.quantity} onChange={e => changeQuantity(item, Number( e.target.value))}>
              {/*  <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
           </select>      */}

               {[...Array(100)].map((_, index) => (
                  <option key={index + 1}>{index + 1}</option>
                ))}
             </select>
              </div>

              <div>
                <Price price={item.price} />
              </div>

              <div>
                <button className={classes.remove_button} onClick={() => removeFromCart(item.food.id)}
                >Remove</button>
              </div>
            </li>
            ))}
           </ul>

           <div className={classes.checkout}>
           <div>
             <div className={classes.foods_count}>{cart.totalCount}</div>
             <div className={classes.total_price}>
                <Price price={cart.totalPrice} />
             </div>
             </div>

           <Link to="/checkout">Proceed to Checkout</Link>
            </div>
          </div>
        )}
  </>
);
};

import React, { useContext } from 'react'
import './Cart.css'
import {StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems, product_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);

  const navigate = useNavigate();


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {product_list.map((item)=>{
          if(cartItems[item._id]>0)
            {
              return (
                <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>PHP {item.new_price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>PHP {item.new_price*cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
                </div>
              )
            }
        })}

      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
                <p>Sub Total</p>
                <p>PHP {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>PHP {getTotalCartAmount()===0?0:47}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>PHP {getTotalCartAmount()===0?0:getTotalCartAmount()+47}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed to Check Out</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
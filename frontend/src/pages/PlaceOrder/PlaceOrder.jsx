import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Payment from '../../components/Payment/Payment'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, product_list, cartItems, url } = useContext(StoreContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);
    
    // Create the order items array
    let orderItems = [];
    product_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          _id: item._id,
          name: item.name,
          new_price: item.new_price,
          quantity: cartItems[item._id]
        });
      }
    });

    // Create the order data object
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 90
    };

    try {
      const response = await axios.post(
        `${url}/api/order/place`, 
        orderData,
        { 
          headers: { 
            Authorization: `Bearer ${token}`
          } 
        }
      );

      if (response.data.success) {
        window.location.href = response.data.session_url;
      } else {
        setError(response.data.message || "Failed to create order");
      }
    } catch (error) {
      console.error('Order error:', error);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsProcessing(false);
    }
};
  
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <>
      {/* {orderPlaced && <div className="order-placed-notification">Order is placed, wait for us to message you about your order</div>} */}
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
            <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
          </div>
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required />
          <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
          <div className="multi-fields">
            <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
            <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
          </div>
          <div className="multi-fields">
            <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' required />
            <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
          </div>
          <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Sub Total</p>
                <p>PHP {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Standard Delivery Fee</p>
                <p>PHP {getTotalCartAmount() === 0 ? 0 : 90}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>PHP {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 90}</b>
              </div>
            </div>
            <button type='submit'>Proceed to Payment</button>
          </div>
        </div>
      </form>
      {/* {showPayment && <Payment setShowPayment={setShowPayment} />} */}
    </>
  );
}

export default PlaceOrder;

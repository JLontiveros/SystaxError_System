import React, { useContext, useState } from 'react';
import './CSS/PlaceOrder.css';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalAmount = getTotalCartAmount();
    const items = cartItems; // Assuming `cartItems` is an array of items in the cart

    try {
      const response = await axios.post('http://localhost:4001/placeorder', {
        items,
        totalAmount,
        deliveryInfo: formData
      }, {
        headers: {
          'auth-token': localStorage.getItem('token') // Assuming the token is stored in localStorage
        }
      });

      if (response.data.success) {
        alert('Order placed successfully!');
        // Optionally, you can redirect the user or clear the form/cart
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder='Firstname' value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} required />
        </div>
        <input type="email" name="email" placeholder='Email Address' value={formData.email} onChange={handleChange} required />
        <input type="text" name="street" placeholder='Street' value={formData.street} onChange={handleChange} required />
        <div className="multi-fields">
          <input type="text" name="city" placeholder='City' value={formData.city} onChange={handleChange} required />
          <input type="text" name="state" placeholder='State' value={formData.state} onChange={handleChange} required />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipCode" placeholder='Zip Code' value={formData.zipCode} onChange={handleChange} required />
          <input type="text" name="country" placeholder='Country' value={formData.country} onChange={handleChange} required />
        </div>
        <input type="text" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} required />
      </div>
      <div className="place-order-right">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>PHP {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>PHP {getTotalCartAmount()}</h3>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;

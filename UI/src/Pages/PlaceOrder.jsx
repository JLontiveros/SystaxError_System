import React, { useContext, useState } from 'react';
import './CSS/PlaceOrder.css';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import upload_area from '../Components/Assets/upload_area.svg';
import gikas from '../Components/Assets/gikas.PNG';
import delete_icon from '../Components/Assets/delete_icon.png';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, all_product, removeFromCart } = useContext(ShopContext);
  const [image, setImage] = useState(null);

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
  
    try {
      const totalAmount = getTotalCartAmount();
      const items = all_product
        .filter(product => cartItems[product.id] > 0)
        .map(product => ({
          id: product.id,
          name: product.name,
          quantity: cartItems[product.id]
        }));
    
      const formDataJSON = new FormData();
      formDataJSON.append('items', JSON.stringify(items));
      formDataJSON.append('totalAmount', totalAmount);
      formDataJSON.append('deliveryInfo', JSON.stringify(formData));
      formDataJSON.append('image', image);
    
      const response = await axios.post('http://localhost:4000/placeorder', formDataJSON, {
        headers: {
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'multipart/form-data' 
        }
      });
  
      if (response.data.success) {
        alert('Order placed successfully! Wait for us to message you about your order!');
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      alert('Error placing order. Please try again later.');
    }
  };
  

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className='place-order'>
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
        <p className="upload-receipt-text">UPLOAD RECEIPT HERE</p>
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
          <input id="file-input" type="file" onChange={imageHandler} style={{ display: 'none' }} />
        </label>
      </div>
      <div className="place-order-right">
        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className="placeorder-format placeorder-format-main">
                  <img src={e.image} alt="" className='order-product-icon' />
                  <p>{e.name}</p>
                  <p>PHP {e.new_price}</p>
                  <button className='order-quantity'>{cartItems[e.id]}</button>
                  <p>PHP {e.new_price * cartItems[e.id]}</p>
                  <img className='order-remove-icon' src={delete_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <hr />
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
          <button type="submit">Payment</button>
          <img src={gikas} alt="" />
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

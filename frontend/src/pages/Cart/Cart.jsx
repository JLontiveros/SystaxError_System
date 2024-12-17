import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, product_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState({});

  useEffect(() => {
    setRecommendedProducts(generateRecommendations(cartItems, product_list));
  }, [cartItems, product_list]);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    setRecommendedProducts(generateRecommendations(cartItems, product_list));
  };

  const isCartEmpty = Object.values(cartItems).every(quantity => quantity === 0);

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
        {product_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>PHP {item.new_price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>PHP {item.new_price * cartItems[item._id]}</p>
                  <p onClick={() => handleRemoveFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
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
              <p>PHP {getTotalCartAmount() === 0 ? 0 : 90}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>PHP {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 90}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to Check Out</button>
        </div>
      </div>
      {!isCartEmpty && (
        <RecommendationSection recommendedProducts={recommendedProducts} product_list={product_list} cartItems={cartItems} />
      )}
    </div>
  );
};

const generateRecommendations = (cartItems, product_list) => {
  const recommendedProducts = {};

  // Group cart items by category
  const cartItemsByCategory = {};
  Object.keys(cartItems).forEach(itemId => {
    const item = product_list.find(product => product._id === itemId);
    if (item && cartItems[itemId] > 0) {
      const category = item.category;
      if (!cartItemsByCategory[category]) {
        cartItemsByCategory[category] = [];
      }
      cartItemsByCategory[category].push(itemId);
    }
  });

  // Generate recommendations within each category
  Object.keys(cartItemsByCategory).forEach(category => {
    const categoryProducts = product_list.filter(product => product.category === category && !cartItems[product._id]);
    recommendedProducts[category] = categoryProducts.slice(0, 5).map(product => product._id); // Limit to top 5 recommendations
  });

  return recommendedProducts;
};

const RecommendationSection = ({ recommendedProducts, product_list, cartItems }) => {
  return (
    <div className="recommendation-section">
      <h2>Recommended Products</h2>
      {Object.keys(recommendedProducts).map((category) => (
        <div key={category}>
          <br></br>
          <h3>Recommended for {category}</h3>
          <ul>
            {recommendedProducts[category].map((recommendedItemId) => {
              const recommendedProduct = product_list.find(item => item._id === recommendedItemId);
              return recommendedProduct && (
                <ul key={recommendedItemId}>
                  <div>{recommendedProduct.name}</div>
                  <br></br>
                </ul>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Cart;
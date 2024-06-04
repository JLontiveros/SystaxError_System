import React, { useState } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import {assets} from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Newest Product</h1>
      <div className="bev-list">
        <div className='medyoheader'>
        <img src={assets.search_icon} alt="" />
          <input 
            type="text" 
            placeholder="Find The Product You want" 
            value={searchQuery} 
            onChange={handleSearchChange} 
            className="search-input" // Apply the CSS class here
          />
        </div>
        <ProductDisplay category={category} searchQuery={searchQuery} />
      </div>
      <p className='explore-menu-text'>
        Explore our products, including a wide range of dog food, cat food, and other essential pet supplies
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div 
            onClick={() => setCategory(prev => (prev === item.menu_name ? "All" : item.menu_name))} 
            key={index} 
            className='explore-menu-list-item'
          >
            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

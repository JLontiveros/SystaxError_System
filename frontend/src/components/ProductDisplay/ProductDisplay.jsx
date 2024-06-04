import React, { useContext } from 'react';
import './ProductDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';

const ProductDisplay = ({ category, searchQuery }) => {
  const { product_list } = useContext(StoreContext);

  return (
    <div className='product-display' id='product-display'>
      <h2>Top Products Near You</h2>
      <div className="product-display-list">
        {product_list
          .filter(item => {
            const matchesCategory = category === "All" || category === item.category;
            const matchesSearchQuery = item.name && searchQuery
              ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
              : true;
            return matchesCategory && matchesSearchQuery;
          })
          .map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              old_price={item.old_price}
              new_price={item.new_price}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductDisplay;

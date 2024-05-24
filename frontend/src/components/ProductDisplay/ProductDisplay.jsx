import React, { useContext } from 'react';
import './ProductDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';

const ProductDisplay = ({ category }) => {
    const { product_list } = useContext(StoreContext);

    return (
        <div className='product-display' id='product-display'>
            <h2>Top Products Near You</h2>
            <div className="product-display-list">
                {product_list.map((item) => {
                  {console.log(category,item.category)}
                    if (category === "All" || category === item.category) {
                        return (
                            <ProductItem
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                old_price={item.old_price}
                                new_price={item.new_price}
                                image={item.image}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default ProductDisplay;

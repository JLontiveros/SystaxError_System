import React from 'react'
import './ProductItem.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const ProductItem = ({id,name,old_price,new_price,description,image}) => {

    const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);
    
  return (
    <div className='product-item'>
        <div className="product-item-img-container">
            <img className='product-item-image' src={image} alt="" />
            {!cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className='product-item-counter'> 
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="product-item-info">
            <div className="product-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="product-item-desc">{description}</p>
            <div className='product-price'>
            <p className="product-item-oldprice">PHP {old_price}</p>
            <p className="product-item-newprice">PHP {new_price}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductItem

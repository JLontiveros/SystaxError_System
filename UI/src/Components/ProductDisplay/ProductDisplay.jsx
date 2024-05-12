import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {

    const {product} =props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(20)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">PHP {product.old_price}</div>
                <div className="productdisplay-right-price-new">PHP {product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi voluptatibus natus necessitatibus quibusdam numquam, possimus eveniet in itaque ad. Consectetur blanditiis laborum laboriosam cumque adipisci doloremque beatae accusantium culpa commodi?
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category :</span>FOOD , CAT, DOG</p>
            <p className='productdisplay-right-category'><span>Tags :</span>Supplies, Food</p>
      </div>
    </div>
  )
}

export default ProductDisplay

import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="description-nav-box">Description</div>
        <div className="description-nav-box fade">Reviews (21) </div>
      </div>
      <div className="descriptionbox-description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aliquid repellat praesentium tenetur nam sint reiciendis, aliquam consequatur quod sequi blanditiis, numquam illum perspiciatis cumque eos necessitatibus modi officiis atque!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque nesciunt recusandae quam rerum explicabo porro nemo, doloribus tempora reprehenderit vitae magnam minima voluptas provident tenetur consequatur ab sapiente in. Mollitia.     
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox

import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Bark's n Meow mission is simple yet profound: to provide the highest quality products at an affordable price, ensuring that every pet receives the care and attention they deserve. In this research paper, we delve into the core values and innovative approaches that underpin Bark's n Meow's operations, exploring how the company's dedication to excellence and empathy sets it apart in the competitive pet care industry. Through a comprehensive examination of Bark's n Meow's mission and vision, we uncover the profound impact of their commitment to pet welfare and customer satisfaction.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>STORE</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>09123456789</li>
                <li>barksnmeow@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copy-right">Copyright 2024 error.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer

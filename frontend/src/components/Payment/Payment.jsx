import React, { useState } from 'react'
import './Payment.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom' 

export default function Payment({ setShowPayment }) {
    const [currState, setCurrState] = useState("E-wallet")
    const [image, setImage] = useState(false);
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // Simulate form submission (e.g., upload the form data)
        // Assuming successful form submission
        navigate('/myorders');
    }

    return (
        <>
            <div className="payment-popup">
                <form onSubmit={onSubmitHandler} className="payment-popup-container">
                    <div className="payment-left">
                        <div className="payment-popup-title">
                            <h2>{currState}</h2>
                            <img onClick={() => setShowPayment(false)} src={assets.cross_icon} alt="" />
                        </div>
                        <div className="payment-popup-inputs">
                            <h2>Scan QR Code</h2>
                            <img src={assets.qrcode} alt="QR Code" />
                        </div>
                    </div>
                    <div className="payment-right">
                        <div className="add-img-upload flex-col">
                            <p>Upload Receipt</p>
                            <label htmlFor="image">
                                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt=""/>
                            </label>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                            <button type="submit">Continue</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

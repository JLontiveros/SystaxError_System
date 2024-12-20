import React, { useContext, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchOrders = async () => {
        try {
            setLoading(true);
            console.log('Token:', token); // Debug token
            console.log('URL:', `${url}/api/order/userorders`); // Debug URL

            const response = await axios.post(
                `${url}/api/order/userorders`, 
                {}, 
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,  // Changed from just 'token'
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Response:', response); // Debug response
            setData(response.data.data || []); 
        } catch (error) {
            console.error("Full error details:", error); // More detailed error logging
            console.error("Error response:", error.response); // Log response if available
            console.error("Error request:", error.request); // Log request if available
            console.error("Error config:", error.config); // Log config if available
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        } else {
            console.log('No token available'); // Debug token availability
        }
    }, [token, url]);

    if (!token) {
        return <div>Please log in to view your orders</div>;
    }

    if (loading) {
        return <div>Loading orders...</div>;
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data && data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={order._id || index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Parcel icon" />
                            <p>
                                {order.items?.map((item, idx) => 
                                    `${item.name} x ${item.quantity}${idx === order.items.length - 1 ? '' : ', '}`
                                )}
                            </p>
                            <p>PHP {order.amount}.00</p>
                            <p>Items: {order.items?.length || 0}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <div>No orders found</div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
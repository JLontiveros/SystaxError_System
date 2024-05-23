import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [modalImage, setModalImage] = useState(null);
    const [modalItems, setModalItems] = useState(null);

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/placeorder');
            const data = await response.json();
            console.log(data); // Log fetched data to check its structure
            setAllOrders(Array.isArray(data) ? data : []); // Ensure data is an array
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleImageClick = (image) => {
        setModalImage(image);
    };

    const handleItemsClick = (items) => {
        setModalItems(items);
    };

    const closeModal = () => {
        setModalImage(null);
        setModalItems(null);
    };

    return (
        <div className='list-order'>
            <h1>All Orders List</h1>
            <div className="listorder-format-main">
                <p>Receipt</p>
                <p>User Name</p>
                <p>Items</p>
                <p>Total Amount</p>
                <p>Delivery Info</p>
                <p>Order Date</p>
            </div>
            <div className="listorder-all-orders">
                <hr />
                {allOrders.map((order, index) => (
    <div key={index} className="listorder-format-main listorder-format">
        <img 
            src={order.image} 
            alt="Order Receipt" 
            className="listorder-order-icon" 
            onClick={() => handleImageClick(order.image)} 
        />
        <p>{order.userId.name}</p>
        <div className="clickable" onClick={() => handleItemsClick(order.items)}>
            {/* Display product details including ID */}
            {order.items.map((item, idx) => (
                <div key={idx}>
                    <span>ID: {item.id}</span><br />
                    <span>{item.name} (x{item.quantity})</span><br />
                </div>
            ))}
        </div>
        <p>PHP {order.totalAmount}</p>
        <p>
            {order.deliveryInfo.street}, {order.deliveryInfo.city}, {order.deliveryInfo.state}, {order.deliveryInfo.zipCode}, {order.deliveryInfo.country}
        </p>
        <p>{new Date(order.orderDate).toLocaleDateString()}</p>
    </div>
))}

            </div>

            {modalImage && (
                <div className="modal" onClick={closeModal}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={modalImage} alt="Order Receipt" />
                </div>
            )}

            {modalItems && (
                <div className="modal" onClick={closeModal}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className="modal-content">
                        <h2>Order Items</h2>
                        {modalItems.map((item, idx) => (
                            <div key={idx}>
                                <p>{item.productName} (x{item.quantity})</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;

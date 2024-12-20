import React from 'react'

const VerifyPayment = () => {
    const [status, setStatus] = useState('verifying');
    const navigate = useNavigate();
    const { url } = useContext(StoreContext);
  
    // In your success page component
useEffect(() => {
  const verifyPayment = async () => {
      const orderId = new URLSearchParams(window.location.search).get('orderId');
      if (orderId) {
          try {
              await axios.post(`${url}/api/order/verify`, {
                  orderId,
                  success: "true"
              });
              // Redirect to orders page or show success message
          } catch (error) {
              console.error("Error verifying payment:", error);
          }
      }
  };
  
  verifyPayment();
}, []);
  
    const statusMessages = {
      verifying: 'Verifying your payment...',
      success: 'Payment successful! Thank you for your order.',
      failed: 'Payment was not completed.',
      error: 'An error occurred while verifying payment.'
    };
  
    return (
      <div className="verify-payment">
        <h2>{statusMessages[status]}</h2>
        {status !== 'verifying' && (
          <button onClick={() => navigate('/orders')}>
            {status === 'success' ? 'View Your Orders' : 'Return to Cart'}
          </button>
        )}
      </div>
    );
  };

export default VerifyPayment
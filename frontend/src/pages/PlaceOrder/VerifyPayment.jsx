import React from 'react'

const VerifyPayment = () => {
    const [status, setStatus] = useState('verifying');
    const navigate = useNavigate();
    const { url } = useContext(StoreContext);
  
    useEffect(() => {
      const verifyPayment = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        const orderId = localStorage.getItem('pendingOrderId');
  
        if (!orderId) {
          setStatus('error');
          return;
        }
  
        try {
          const response = await axios.post(`${url}/api/order/verify`, {
            orderId,
            success
          });
  
          if (response.data.success) {
            setStatus('success');
            localStorage.removeItem('pendingOrderId');
          } else {
            setStatus('failed');
          }
        } catch (error) {
          setStatus('error');
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
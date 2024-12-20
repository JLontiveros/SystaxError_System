import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:4000';
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [product_list, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const addToCart = async (itemId) => {
        try {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1
            }));

            if (token) {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { 
                        headers: { 
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        } 
                    }
                );
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            // Rollback the optimistic update if the API call fails
            setCartItems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) - 1
            }));
        }
    }

    const removeFromCart = async (itemId) => {
        try {
            setCartItems((prev) => {
                const updatedCart = { ...prev };
                if (updatedCart[itemId] > 0) {
                    updatedCart[itemId] -= 1;
                    if (updatedCart[itemId] === 0) {
                        delete updatedCart[itemId];
                    }
                }
                return updatedCart;
            });

            if (token) {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { 
                        headers: { 
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        } 
                    }
                );
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            // Rollback the optimistic update if the API call fails
            setCartItems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1
            }));
        }
    };

    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const itemInfo = product_list.find((product) => product._id === itemId);
            return total + (itemInfo ? itemInfo.new_price * quantity : 0);
        }, 0);
    };

    const fetchProductList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            setProductList(response.data.data);
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { 
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    } 
                }
            );
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error('Error loading cart data:', error);
            if (error.response?.status === 401) {
                // Handle unauthorized error - clear token and redirect to login
                logout();
            }
        }
    }

    const isTokenExpired = (token) => {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.exp * 1000 < Date.now();
        } catch (error) {
            return true;
        }
    };

    // Check token expiration on mount and when token changes
    useEffect(() => {
        if (token && isTokenExpired(token)) {
            // Clear token and redirect to login
            localStorage.removeItem('token');
            setToken(null);
            // If you're using react-router, you can redirect to login here
            window.location.href = '/login';
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
                    // Auto logout on 401 responses
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setCartItems({});
        window.location.href = '/login';
    };


    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            try {
                await fetchProductList();
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            } catch (error) {
                console.error('Error initializing data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        product_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        isLoading,
        login,
        logout,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {!isLoading && props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
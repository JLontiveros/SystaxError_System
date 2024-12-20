import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { useState } from 'react'
import MyOrders from './pages/MyOrders/MyOrders'
import Payment from './components/Payment/Payment'
import VerifyPayment from './pages/PlaceOrder/VerifyPayment'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        < Route path = '/' element={<Home/>} />
        < Route path = '/cart' element={<Cart/>} />
        < Route path = '/order' element={<PlaceOrder/>} />
        < Route path = '/myorders' element={<MyOrders/>} />
        < Route path = '/payment' element = {<Payment/>}/>
        < Route path = '/verify' element = {<VerifyPayment/>} />
      </Routes>
    </div>
    <Footer/>
    {showPayment && <Payment setShowPayment={setShowPayment} />}
    </>
  )
}

export default App

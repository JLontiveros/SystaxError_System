
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCatergory from './Pages/ShopCatergory';
import Product from './Pages/Product';
import LoginSigup from './Pages/LoginSigup';
import Cart from './Pages/Cart';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCatergory category="men"/>}/>
        <Route path='/womens' element={<ShopCatergory category="women"/>}/>
        <Route path='/kids' element={<ShopCatergory category="kid"/>}/>
        <Route path="/product" element ={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSigup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './HomeScreen/Nav';
import SharedLayout from './HomeScreen/SharedLayout';
import axios from 'axios';
import Products from './HomeScreen/Products';
import Product from './Screens/Product';
import Cart from './Screens/Cart'
import { useState } from 'react'
import Register from './HomeScreen/Register';
import Login from './HomeScreen/Login';
import CheckOut from './Screens/CheckOut';
import { UserContext } from './Context/UserContext';
import { ProductContext } from './Context/ProductContext'
function App() {
  const [product, setProduct] = useState(null);
   const [user,setUser]= useState(null)
  return (
    <UserContext.Provider value={{user,setUser}}>
    <ProductContext.Provider value={{ product, setProduct }}>
          <BrowserRouter>
        <Routes>
        <Route path='/' element={<SharedLayout />}>
            <Route index element={<Products />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={ <Login/>} />
            <Route path='product' element={<Product />} />
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={ <CheckOut/>} />
        </Route>
      </Routes>
    </BrowserRouter>
     
      </ProductContext.Provider>   
      </UserContext.Provider>
  )
}

export default App

import Footer from "./components/Footer";
import Header from "./components/Header";
import axios from "axios";
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./utils/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import AddProductPage from "./pages/AddProductPage";
import Product from "./pages/Product";
import EditProduct from './pages/EditProduct';
import SinglrProduct from "./pages/SinglrProduct";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import ByCategory from "./pages/ByCategory"; 
import PaymentMethod from "./pages/PaymentMethod";
import AllOrders from "./pages/AllOrders";
import { 
  Elements, 
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";
import Forgot from "./pages/Forgot";
axios.defaults.baseURL ='https://rdev-ecommerce.onrender.com/api/v1/';

function App() {
  const stripePromise = loadStripe('pk_test_51Or05pSD9GFPRtaaCJ90Cs3TMpKrrmCKC9rMxGTcEk6ZmrcLzynyXBjDBjUbU5Ar68KySQiS9D6BD3x8XGtCSgI900XtRCWlWo')



  return (
    <>
      <Header />
      <Routes> 
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/admin/category' element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
        <Route path='/admin/add-products' element={<ProtectedRoute><AddProductPage /></ProtectedRoute>} />
        <Route path='/admin/products' element={<ProtectedRoute><Product /></ProtectedRoute>} />  
        <Route path='/admin/all-orders' element={<ProtectedRoute><AllOrders /></ProtectedRoute>} />  
        <Route path='/admin/edit-product/:id' element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />  
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/user/product/:id' element={<ProtectedRoute><SinglrProduct /></ProtectedRoute>} />  
        <Route path='/user/category' element={<ProtectedRoute><ByCategory /></ProtectedRoute>} />   
        <Route path='/user/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/user/payment-option' element={<ProtectedRoute><Elements stripe={stripePromise}><PaymentMethod/></Elements></ProtectedRoute>} />    
        <Route path='/user/orders' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />  
        {/*  */}
        <Route path="/cancel" element={<ProtectedRoute><Cancel/></ProtectedRoute>} />
        <Route path="/success" element={<ProtectedRoute><Success/></ProtectedRoute>} />
        {/* 
         */}
         <Route path="/forgot-password" element={<Forgot/>} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
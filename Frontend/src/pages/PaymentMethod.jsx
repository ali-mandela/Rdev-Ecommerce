import axios from "axios";
import { useUserContext } from "../../context/userContext";
import styles from '../styles/cart.module.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import {loadStripe} from '@stripe/stripe-js';

const PaymentMethod = () => {
  const { cart,user,clearCart } = useUserContext();
  const [address, setaddress] = useState('')
  const nav= useNavigate();
  const stripe = useStripe();
  const items =cart;

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.item.price * item.quantity);
    }, 0);
  };

  const handlePayNow= async()=>{

    if(!address){
      toast("Enter the address field");
      return;
    }

    const stripePromise = await loadStripe('pk_test_51Or05pSD9GFPRtaaCJ90Cs3TMpKrrmCKC9rMxGTcEk6ZmrcLzynyXBjDBjUbU5Ar68KySQiS9D6BD3x8XGtCSgI900XtRCWlWo')


    const paymentData = {
      user: user?._id,
      items: items, 
      totalAmount: calculateTotalPrice(),
      status: 'Pending',
      address
    };

    try { 
      const response = await axios.post('/product/pay-now', paymentData);
  
      if (response.data.success) {  
          toast(response.data.message);
          const res = await stripePromise.redirectToCheckout({
            sessionId: response.data?.sessionId,
          });
          console.log(res);
          clearCart();
          nav('/')
      } else {
          toast(response.data.message);
      }
    } catch (error) {
      console.error('Error saving payment details:', error);
      toast(error.message);
    }
  }

  const handlePayLater= async()=>{
    if(!address){
      toast("Enter the address field");
      return;
    }

 const paymentData = {
    user: user?._id,
    items: items, 
    totalAmount: calculateTotalPrice(),
    status: 'Pending',
    address
  };

  try { 
    const response = await axios.post('/product/pay-later', paymentData);

    if (response.status === 200) {
        toast(response.data.message);
        clearCart();
        nav('/')
    } else {
        toast(response.data.message);
    }
  } catch (error) {
    console.error('Error saving payment details:', error);
    toast(error.message);
  }
};

  return (
    <div className={styles.paymentContainer}>
      <h2>Payment Method</h2>
      <div className={styles.address}>
      <label>Address -in street,city,country,pin code format. </label> 
      <input placeholder="Enter your address " type="text" value={address} onChange={(e)=> setaddress(e.target.value)} />
      </div>
      <div className={styles.paymentDetails}>
        <p>Total Price: ${calculateTotalPrice()}</p>
        <div className={styles.paymentOptions}>
          <button className={styles.paymentButton} onClick={() => handlePayNow()}>
            Pay Now
          </button>
          <button className={styles.paymentButton} onClick={() => handlePayLater()}>
            Pay Later
          </button>
        </div> 
      </div>
    </div>
  );
};

export default PaymentMethod;

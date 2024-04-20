import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import styles from '../styles/cart.module.css'
 

const Cart = () => {
  const nav = useNavigate();
  const { cart,incrementInCart,decrementInCart ,deleteFromCart} = useUserContext();
  const URL ='https://rdev-ecommerce.onrender.com/uploads/';

  const handleCheckout=()=>{
    nav('/user/payment-option')
     
  }
 

  

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.item.price * item.quantity);
    }, 0);
  };

 
  return (
     <>
        <div className={styles.cartContainer}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Add items to cart as cart is empty</p>
      ) : (
        <>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Actions</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem) => (
                <tr key={cartItem.item._id}>
                  <td>{cartItem.item.name}</td>
                  <td>
                    <img 
                      src={`${URL}${cartItem?.item?.image}`}
                      alt={cartItem.item.name} 
                      className={styles.productImage}
                    />
                  </td>
                  <td>${cartItem.item.price}</td>
                  <td>
                    <button onClick={() => decrementInCart(cartItem.item)}> - </button>
                    {cartItem.quantity}
                    <button onClick={() => incrementInCart(cartItem.item)}> + </button>
                  </td>
                  <td>
                    <button onClick={() => deleteFromCart(cartItem.item)} className={styles.removeButton}>Remove</button>
                  </td>
                  <td>${cartItem.item.price * cartItem.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.totalContainer}>
            <h3>Grand Total: ${calculateTotalPrice()}</h3>
            <button onClick={handleCheckout} className={styles.checkoutButton}>Check out</button>
          </div>
        </>
      )}
    </div> 
     </>
  );
};

export default Cart;
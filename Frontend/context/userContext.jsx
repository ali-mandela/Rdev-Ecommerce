/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import {createContext, useContext, useState} from 'react' 

const userContext = createContext()

const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [categories, setcategories] = useState([])
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    const handleAddToCart = ({product, quantity = 1}) => { 
        const existingItemIndex = cart.findIndex(
          (item) => item?.item?._id === product._id
        );
      
        if (existingItemIndex !== -1) {
          const updatedCartItems = cart.map((item, index) => {
            if (index === existingItemIndex) {
              return {
                ...item,
                quantity: item.quantity + quantity,
              };
            }
            return item;
          });
      
          setCart(updatedCartItems);
        } else {
          // If the item doesn't exist in the cart, add it to the cartItems array
          setCart([...cart, { item: product, quantity }]);
        }
      };
      
      

      const incrementInCart = (cartItem) => {
        console.log(cartItem);
        const existingItemId = cart.findIndex(
          (item) => item?.item?._id === cartItem?._id
        );
    
        if (existingItemId !== -1) {
          const updatedCartItems = cart.map((item, index) => {
            if (index === existingItemId) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          });
    
          setCart(updatedCartItems);
        }
      };

      const deleteFromCart = (cartItem) => {
        const updatedCartItems = cart.filter(
          (item) => item.item._id !== cartItem?._id
        );
    
        setCart(updatedCartItems);
      };

      const clearCart = () => {
        setCart([]);
      };

      const decrementInCart = (cartItem) => {
        const existingItemIdForDec = cart.findIndex(
          (item) => item.item._id === cartItem?._id
        );
    
        if (existingItemIdForDec !== -1) {
          const updatedCartItems = cart.map((item, index) => {
            if (index === existingItemIdForDec) {
              // Decrease the quantity if it's greater than 1
              return {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1, // Ensure quantity never goes below 1
              };
            }
            return item;
          });
    
          setCart(updatedCartItems);
        }
      };
  
 
        return(
            <userContext.Provider value={{user, setUser,cart,incrementInCart,clearCart, deleteFromCart, decrementInCart, setCart, categories,products, setProducts,handleAddToCart,  setcategories}}>
                {
                    children
                }
            </userContext.Provider>
        )

}

const useUserContext = ()=>{
    return useContext(userContext)
}

export {UserProvider, useUserContext} ;
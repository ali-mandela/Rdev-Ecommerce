/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import styles from '../styles/component.module.css';

const ProductComponent = ({product}) => {
    
    const { handleAddToCart } = useUserContext();
    const URL ='https://rdev-ecommerce.onrender.com/uploads/';
    let quantity =1;
  return (
    <div className={styles.product}>
      <img  src={`${URL}${product.image}`}  alt={product?.name} className={styles.productImage} />
      <h3 className={styles.productName}>{product.name}</h3>
       <p className={styles.productCat}>{product.category}</p>
       <p className={styles.productPrice}>${product.price}</p>
      <div className={styles.productActions}> 
        <button onClick={()=>handleAddToCart({product,quantity})} className={styles.addToCartButton}>
          Add to Cart
        </button>
        <button   className={styles.viewProductButton}>
          <Link to={`/user/product/${product?._id}`}>View Product</Link>
        </button>
      </div>
    </div>
  )
}

export default ProductComponent
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from '../styles/user.module.css'
import { useUserContext } from "../../context/userContext";
const URL = 'http://localhost:8000/uploads';
 
const SinglrProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { handleAddToCart } = useUserContext();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/product/${id}`);

                if (res.data.success) {
                    setProduct(res.data.data)
                    // toast(res.data.message)
                } else {
                    toast(res.data.message)
                    toast.error('Failed to fetch product details.');
                }
            } catch (error) {
                console.error(error.message);
                toast.error('Error fetching product details.');
            }
        };

        fetchProduct();
    }, [id]);
  return (
    <div className={styles.mainProduct}>
            <div className={styles.section1}>
                <img 
                    src={`${URL}/${product?.image}`} 
                    alt={product?.name} 
                    className={styles.productImage} 
                />
            </div>
            <div className={styles.section2}>
                <h2>{product?.name}</h2>
                <p>Category: {product?.category}</p>
                <p>{product?.description}</p>
                <p>Price: ${product?.price}</p>
                <div className={styles.quantityControl}>
                    <button 
                        onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                        disabled={quantity === 1}
                    >
                        -
                    </button>
                    <span> {quantity} </span>
                    <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                </div>
                <button className={styles.addToCartButton} onClick={()=>handleAddToCart({product,quantity})}>
                    Add to Cart
                </button>
            </div>
        </div>
  )
}

export default SinglrProduct
import { useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';
import styles from '../styles/product.module.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Product = () => {
    const { products, setProducts } = useUserContext();
    const navigate = useNavigate();

    const URL ='https://rdev-ecommerce.onrender.com/uploads';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/product/all-products');

                if (res.data.success) {
                    console.log(res.data);
                    setProducts(res.data.data);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchProducts();
    }, [setProducts]);

    const handleDelete = async (productId) => {
        try {
            const res = await axios.delete(`/product/${productId}`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            if (res.data.success) {
                const updatedProducts = products.filter(
                    (product) => product._id !== productId
                );
                setProducts(updatedProducts);
                toast(res.data.message)
            } else {
                console.error('Failed to delete product');
                toast(res.data.message)
            }
        } catch (error) {
            console.error('Error deleting product:', error.message);
            toast.error(error.message)
        }
    };

    const handleEdit = (productId) => {
        navigate(`/admin/edit-product/${productId}`);
    };

    return (
        <div className={styles.products}>
            <h1>Products</h1>
            <div className={styles.productList}>
                {products?.map((product) => (
                    <div key={product._id} className={styles.productItem}>
                        <img src={`${URL}/${product.image}`} alt={product.name} className={styles.productImage} />
                        <h2 className={styles.productName}>{product.name}</h2>
                        <p className={styles.productPrice}>${product.price}</p>
                        <p className={styles.productDescription}>{product.description}</p>
                        <p className={styles.productCategory}>Category: {product.category}</p>
                        <p className={styles.productActions}>Actions : <i onClick={()=>handleDelete(product._id)} className="fa-solid fa-trash"></i> <i onClick={()=>handleEdit(product._id)} className="fa-solid fa-pen-to-square"></i></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;

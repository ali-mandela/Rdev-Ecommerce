import axios from "axios";
import { useUserContext } from "../../context/userContext";
import styles from '../styles/category.module.css';
import { toast } from "react-toastify";

 

// eslint-disable-next-line react/prop-types
const AllCategories = ({ title, isDelete }) => {
    const { categories } = useUserContext();

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/category/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
    
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            window.location.reload();
        }
    };
    

    return (
        <div className={styles.categoryContainer}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.categoryList}>
            {
                categories.length === 0 &&  <p>As of now, there are no categories.</p>
            }
                {categories && categories.map((category) => (
                    <div key={category._id} className={styles.categoryItem}>
                        <p>{category.name}</p>
                        {isDelete && <button  onClick={() => handleDelete(category._id)} className={styles.deleteButton}>Delete</button>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCategories;
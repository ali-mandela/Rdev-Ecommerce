import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/product.module.css';
import { useUserContext } from '../../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const { categories } = useUserContext();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [fileName, setFileName] = useState('');
    const nav = useNavigate();
    const URLL = 'http://localhost:8000/uploads';
    const [isImageChanged, setIsImageChanged] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/product/${id}`);

                if (res.data.success) {
                    const product = res.data.data;
                    setName(product.name);
                    setPrice(product.price);
                    setDescription(product.description);
                    setCategory(product.category);
                    setFileName(product.image);
                } else {
                    toast.error('Failed to fetch product details.');
                }
            } catch (error) {
                console.error(error.message);
                toast.error('Error fetching product details.');
            }
        };

        fetchProduct();
    }, [id]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setIsImageChanged(true);
    };

    const uploadImage = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('file', image);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            if (res.data.success) {
                setFileName(res.data.fileName);
                setIsImageChanged(true);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to upload image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !fileName || !description || !category) {
            toast.error('Please fill in all fields.');
            return;
        }

        const productData = {
            name,
            price,
            image: fileName,
            description,
            category,
        };

        try {
            const res = await axios.put(`/product/${id}`, productData, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            if (res.data.success) {
                toast.success(res.data.message);
                nav('/admin/products');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to update product.');
        }
    };

    return (
        <div className={styles.AddProductPage}>
            <div className={styles.section2}>
                {(isImageChanged && image) ? (
                    <img src={URL.createObjectURL(image)} alt="Preview" className={styles.imagePreview} />
                ) : (
                    <img src={`${URLL}/${fileName}`} alt={fileName} className={styles.imagePreview} />
                )}

                <form onSubmit={uploadImage} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Image:</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {fileName ? 'Image Uploaded Successfully' : 'Upload Image'}
                    </button>
                </form>
            </div>

            <div className={styles.section1}>
                <h1>Edit Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className={styles.textareaField}
                        ></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className={styles.inputField}
                        >
                            <option disabled value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;

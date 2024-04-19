import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/category.module.css';
import { toast } from 'react-toastify';

const AddCategory = () => {
    const [name, setName] = useState(''); 

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/category/', { name },{
                headers: {
                    Authorization: localStorage.getItem('token')
                  }
            });
            
            if (response.data.success) { 
                setName(''); 
                toast(response.data.message)
            } else{
                toast(response.data.message)
            }
        } catch (error) { 
            console.error(error);
            toast(error.message)
        }
    };

    return (
        <div className={styles.AddCategory}>
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    placeholder='Category Name' 
                    value={name} 
                    onChange={handleChange} 
                    className={styles.inputField} 
                    required 
                />
                <button type='submit' className={styles.addButton}>
                    Add
                </button>
            </form>
           </div>
    );
};

export default AddCategory;

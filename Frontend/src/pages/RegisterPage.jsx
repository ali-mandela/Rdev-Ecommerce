import {useState} from 'react';
import axios from 'axios';
import styles from '../styles/auth.module.css';
import Image from '../assets/registerImage.svg';
import {toast} from 'react-toastify';
import {useUserContext} from '../../context/userContext';
import {Link, useNavigate} from 'react-router-dom';

const RegisterPage = () => {
    const [name,
        setName] = useState('');
    const [password,
        setPassword] = useState('');
    const [securityCode,
        setSecurityCode] = useState('');
    const [email,
        setEmail] = useState('');
    const {setUser} = useUserContext();
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/register', {name, email, password, securityCode});
            if (response.data.success) {
                const data = response.data.data;
                localStorage.setItem('token', data.token)
                setUser(data.user)
                toast(response.data.message)
                navigate('/');
            } else {
                toast(response.data.message)
            }

        } catch (error) {
            console.error('Registration failed:', error);
            toast.error(error.message)
        }
    };

    return (   <div className={styles.mainRegister}>
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Register</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.inputField}
                        required/>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputField}
                        required/>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputField}
                        required/>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="securityCode">Security Code
                        <br/>
                        <span className={styles.securityHint}>
                            * Remember this in case of forgot password
                        </span>
                    </label>
                    <input
                        type="text"
                        id="securityCode"
                        value={securityCode}
                        onChange={(e) => setSecurityCode(e.target.value)}
                        className={styles.inputField}
                        required/>
                </div>
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.submitButton}>
                        Register
                    </button>
                </div>
                <p>Already registered. <Link to='/login'>Login</Link></p>
            </form>
        </div>
        <div className={styles.bannerImage}>
            <img src={Image} alt="register-page" className={styles.image}/>
        </div>
    </div> 
  );
};

export default RegisterPage;
import {useState} from 'react';
import axios from 'axios';
import styles from '../styles/auth.module.css';
import Image from '../assets/registerImage.svg';
import {toast} from 'react-toastify';
import {useUserContext} from '../../context/userContext';
import {Link, useNavigate} from 'react-router-dom'; 
const LoginPage = () => { 
const [password,
    setPassword] = useState(''); 
const [email,
    setEmail] = useState('');
const {setUser} = useUserContext();
const navigate = useNavigate()

const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/user/login', {  email, password});
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
        console.error('Login failed:', error);
        toast.error(error.message)
    }
};

return (   <div className={styles.mainRegister}>
    <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
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
                <button type="submit" className={styles.submitButton}>
                    Login
                </button>
            </div>
            <p>New user ? <Link to='/register'>Register</Link></p>
            <p>Forgot password - >  <Link to='/forgot-password'>Forgot password</Link></p>
        </form>
    </div>
    <div className={styles.bannerImage}>
        <img src={Image} alt="login-page" className={styles.image}/>
    </div>
</div> 
);
};


export default LoginPage
import { useState } from 'react';
import axios from 'axios';
import style from '../styles/Forgot.module.css';
import { toast } from 'react-toastify';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [password, setPassword] = useState(''); 
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/user/forgot-password', {
        email,
        securityCode,
        password,
      });

      if (response.data.success) {
        setSuccess(true);
        toast(response.data.message);
        setEmail('')
        setPassword('')
        setSecurityCode('')
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast('Failed to reset password. Please try again later.');
    }
  };

  return (
    <div className={style.main}>
      <h2>Forgot Password</h2>  
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={style.inputGroup}>
            <label>Security Code</label>
            <input
              type="text"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              required
            />
          </div>
          <div className={style.inputGroup}>
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
     
    </div>
  );
};

export default Forgot;

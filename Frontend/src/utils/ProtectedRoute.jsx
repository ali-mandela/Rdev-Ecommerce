// import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserContext } from '../../context/userContext';

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const { user, setUser, setcategories, setProducts } = useUserContext();

  const getUser = async () => {
    try {
      const res = await axios.get("/user/get-user", {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      if (res.data.success) {
        setUser(res.data.data.user);
      } else {
        localStorage.clear();
        return <Navigate to='/login' />;
      }
    } catch (error) {
      localStorage.clear();
      // toast.error(error.message);
      return <Navigate to='/login' />;
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get("/category/", {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      if (res.data.success && res.data.data.categories?.length > 0) {
        setcategories(res.data.data.categories);
      }
    } catch (error) {
      // toast.error(error.message);
      console.log(error.message);
    }
  };
 
    const fetchProducts = async () => {
        try {
            const res = await axios.get('/product/all-products');

            if (res.data.success) { 
                setProducts(res.data.data);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

   

  useEffect(() => {
    if (!user) {
      getUser();
    }
    getAllCategories();
    fetchProducts(); 
  }, [user, setcategories]);

  if (localStorage.getItem('token')) {
    return children;
  }

  return <Navigate to='/login' />;
}

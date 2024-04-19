import { Link,useLocation  } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import styles from '../styles/component.module.css';

const Header = () => {
  const { user, cart } = useUserContext();
  const location = useLocation();
  
  const menu = user && user.role === 'admin' ? [
    {
      id: 1,
      name: "Home",
      link: '/'
    },
    {
      id: 2,
      name: "Products",
      link: '/admin/products'
    },
    {
      id: 3,
      name: "Add Products",
      link: '/admin/add-products'
    },
    {
      id: 99,
      name: "All Orders",
      link: '/admin/all-orders'
    },
    {
      id: 4,
      name: "Category",
      link: '/admin/category'
    }
  ] : [
    {
      id: 1,
      name: "Home",
      link: '/'
    },
    {
      id: 2,
      name: "search by category",
      link: '/user/category'
    }, 
    {
      id: 3,
      name: `cart ${cart?.length}`,
      link: '/user/cart'
    },
    {
      id: 4,
      name: "my orders",
      link: '/user/orders'
    }
  ];

  return (
    <div className={styles.header}>
      <h1>R-Ecommerce</h1>
      {
        user ? (
          <div>
            {menu.map(item => (
              <Link key={item.id} to={item.link} className={location.pathname === item.link ? 'activeLink' : ''}>{item.name}</Link>
            ))}
            <Link  onClick={() => {
    localStorage.clear();
    window.location.reload();
  }}  to='/login'>Logout</Link>
          </div>
        ) : (
          <div>
          <Link to='/login' className={location.pathname === '/login' ? 'activeLink' : ''}>Login</Link>
            <Link to='/register' className={location.pathname === '/register' ? 'activeLink' : ''}>Register</Link>
         
          </div>
        )
      }
    </div>
  );
};

export default Header;

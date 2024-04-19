import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import AllCategories from "../components/AllCatgeories";
import style from '../styles/home.module.css'
import ProductComponent from "../components/ProductComponent";
import { useState } from "react";
import axios from "axios";
 
const HomePage = () => {
  const { user,products } = useUserContext();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Make API call to search products
      const response = await axios.get(`/user/search?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div className={style.homePage}> 
    {
      user?.role == 'admin' ? (
        <div className={style.admin}>
       <h1>Hello Admin</h1>
          <h1>Total products available {products?.length}</h1>
          <p>To add more products <Link to='/admin/add-products'>Add Products</Link></p>
          <AllCategories title='List of available categories' isDelete={false} />
       
        </div>

      ) : (<>
        <h1>Hello: {user?.name}</h1> 
    <div className={style.search}>
        <form onSubmit={handleSubmit} className={style.searchForm}>
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={handleInputChange}
            className={style.searchInput}
          />
          <button type="submit" className={style.searchButton}>
            Search
          </button>
        </form>
      </div>
      <div className={style.productMain}> 
      {
            searchResults.length > 0 && 
              searchResults.map((product) => <ProductComponent key={product._id} product={product} />)
      }
      <hr/>
      </div>
    <div className={style.productMain}>
    <div>
    {
      products.map((product)=> <ProductComponent key={product._id} product={product} />)
    }
    </div>
    </div>
      </>)
    }
    
     </div>
  )
}

export default HomePage
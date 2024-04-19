/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import styles from '../styles/byCategory.module.css';
import ProductComponent from '../components/ProductComponent';

const ByCategory = () => {
  const { products, categories } = useUserContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter products based on the selected category
  useEffect(() => {
    const newFilteredProducts = selectedCategory === 'All' 
      ? products 
      : products.filter(product => product.category === selectedCategory);
    
    setFilteredProducts(newFilteredProducts);
  }, [selectedCategory, products]);

  return (
    <div className={styles.main}>
      <h1>Browse by category</h1>
      <div className={styles.category}>
        <p 
          onClick={() => setSelectedCategory('All')} 
          className={selectedCategory === 'All' ? 'selectedCat' : ''}
        >
          All
        </p>
        {categories.map((category) => (
          <p 
            key={category._id} 
            onClick={() => setSelectedCategory(category.name)}
            className={selectedCategory === category.name ? 'selectedCat' : ''}
          >
            {category.name}
          </p>
        ))}
      </div>
      <div className={styles.categoryProducts}>
        <h1>{selectedCategory} Products</h1> 
      <div>
      {
        filteredProducts.length =='0' && <p>No product of selected category.</p>
      }
      {filteredProducts.map((product) => (
          <ProductComponent key={product._id} product={product} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default ByCategory;

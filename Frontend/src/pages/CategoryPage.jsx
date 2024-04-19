import AddCatgory from "../components/AddCatgory"
import AllCatgeories from "../components/AllCatgeories"
import styles from '../styles/category.module.css'
 
const CategoryPage = () => {
  return (
   
    <div className={styles.mainCategory}>
        <AddCatgory/>
        <AllCatgeories title="All Categories" isDelete={true}/> 
    </div>
  )
}

export default CategoryPage
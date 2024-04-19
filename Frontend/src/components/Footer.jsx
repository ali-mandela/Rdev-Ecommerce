import styles from '../styles/component.module.css'
const Footer = () => {
    return (
        <div className={styles.footer}>
            <div>
                © 2024 R-Ecommerce. All Rights Reserved.
            </div>
            <div>
                <i className="fa-brands fa-instagram"/>
                <i className="fa-brands fa-square-facebook"/>
                <i className="fa-brands fa-youtube"/>

            </div>
        </div>
    )
}

export default Footer
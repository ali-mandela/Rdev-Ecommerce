import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/cart.module.css';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/user/my-orders', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrders = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    const handleDelete = async (id) => {
      try {
        await axios.delete(`/product/order/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
        toast('order cancelled succesfully')
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    };

    return (
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Items -Qty</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>
                {order.items.map((item) => (
                  <div key={item.item._id}>
                    {item.item.name} - {item.quantity}
                  </div>
                ))}
              </td>
              <td>${order.totalAmount}</td>
              <td>{order.payment ? 'Paid' : 'Unpaid'}</td>
              <td>{order.status}</td>
              <td>
              {order.status != 'Pending' &&<p>Order is already delivered.</p> }
                {order.status == 'Pending' && <button className={styles.actionButton} onClick={() => handleDelete(order._id)}>
                  Cancel
                </button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.myOrdersContainer}>
      <h2>My Orders</h2>
      {renderOrders()} 
    </div>
  );
};

export default MyOrders;

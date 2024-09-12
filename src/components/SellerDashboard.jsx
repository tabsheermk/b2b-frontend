import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API calls
import { server } from '../main';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);

    const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/api/v1/sellers/getMyProducts`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [refresh]);
  
  // Delete product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/sellers/${productId}`); // API to delete product
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2>Your Products</h2>
      {products.length === 0 ? (
        <p>You have no products listed.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
              <button>Edit</button> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellerDashboard;

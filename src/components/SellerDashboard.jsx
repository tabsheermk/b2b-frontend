import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // For API calls
import { Context, server } from '../main';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // To track if editing or adding
  const [editProductId, setEditProductId] = useState(null); // Track the product being edited

  const { setIsAuthenticated, loading, setLoading, user } = useContext(Context);


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  
  
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

  const handleAddProduct = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (price === 0 || discount === 0) {
      alert("Price can't be zero");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${server}/api/v1/sellers/addProduct`,
        {
          name,
          description,
          category,
          price,
          discount,
          seller_email: user.email
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setProducts([...products, response.data.product]);
      setName("");
      setCategory("");
      setDescription("");
      setDiscount(0);
      setPrice(0);

      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }

  const handleUpdateProduct = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (price === 0 || discount === 0) {
      alert("Price can't be zero");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${server}/api/v1/sellers/${editProductId}`,
        {
          name,
          description,
          category,
          price,
          discount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setProducts([...products, response.data.product]);
      setName("");
      setCategory("");
      setDescription("");
      setDiscount(0);
      setPrice(0);

      setIsAuthenticated(true);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }


  // Populate form with product data for editing
  const handleEdit = (product) => {
    setIsEditing(true);
    setEditProductId(product.product_id);
    setName(product.name);
    setCategory(product.category);
    setDescription(product.description);
    setDiscount(product.discount);
    setPrice(product.price);
  };

  // Delete product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/v1/sellers/${productId}`); // API to delete product
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Products</h2>

      {/* Add/Edit Product Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={isEditing ? handleUpdateProduct : handleAddProduct }>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          {isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* Existing Products */}
      {products.length === 0 ? (
        <p className="text-gray-600">You have no products listed.</p>
      ) : (
        <ul className="list-none space-y-4">
          {products.map((product) => (
            <li key={product.product_id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <h4 className="text-l font-semibold text-gray-700">Category: {product.category}</h4>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800">Price: INR {product.price}</p>
              <p className="text-gray-600">Discount: {product.discount}%</p>
              <div className="mt-4 flex space-x-2">
                <button onClick={() => handleDelete(product.product_id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SellerDashboard;

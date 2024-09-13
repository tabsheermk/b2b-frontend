import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../main';

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${server}/api/v1/buyers/products`, { withCredentials: true }),
          axios.get(`${server}/api/v1/buyers/products/getCategories`, { withCredentials: true })
        ]);
        
        setProducts(productsRes.data.products);
        setFilteredProducts(productsRes.data.products);
        setCategories(categoriesRes.data.categories.map(cat => cat.category));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [search, selectedCategory, products]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((product) => product.product_id !== productId));
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by product name..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mt-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {filteredProducts.map((product) => (
          <div key={product.product_id} className="bg-white p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <h4 className="text-l font-semibold text-gray-700">Category: {product.category}</h4>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-gray-800 mb-2">Price: INR {product.price}</p>
            <p className="text-gray-500 mb-4">Discount: {product.discount}%</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="bg-white p-4 border rounded-lg shadow-md">
            {cart.map((product) => (
              <div key={product.product_id} className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p>Price: INR {product.price}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(product.product_id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;

import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";

function SignUp() {
  
  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitch = () => {
    setIsSeller(!isSeller); // Toggle between buyer and seller
  };


  const { isSeller, setIsSeller, isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const user = isSeller ? "sellers" : "buyers";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/${user}/signup`,
        {
          name,
          email,
          password,
          business_name
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="">
      <div className="">
        <button onClick={handleSwitch}>
          {isSeller ? 'Switch to Buyer' : 'Switch to Seller'}
        </button>
      </div>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={formData.business_name}
            onChange={handleInputChange}
            placeholder="Business Name"
            required
          />
          <input
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required
          />
          <button disabled={loading} type="submit">
              {isSeller ? 'Sign Up as Seller' : 'Sign Up as Buyer'}
          </button>
          <h4>Or</h4>
          <Link to="/sign-in">Login</Link>
        </form>
      </section>
    </div>
  );
}

export default SignUp;
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";

function SignIn() {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
        `${server}/${user}/signin`,
        {
          email,
          password,
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
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <button disabled={loading} type="submit">
              {isSeller ? 'Sign In as Seller' : 'Sign In as Buyer'}
          </button>
          <h4>Or</h4>
          <Link to="/sign-up">Sign Up</Link>
        </form>
      </section>
    </div>
  );
}

export default SignIn;
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";

function SignIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isSeller, setIsSeller, isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);

  const user = isSeller ? "sellers" : "buyers";

  const handleSwitch = () => {
    setIsSeller(!isSeller); // Toggle between buyer and seller
  };


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/v1/${user}/signin`,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="mb-6 text-center">
          <button
            onClick={handleSwitch}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {isSeller ? 'Switch to Buyer' : 'Switch to Seller'}
          </button>
        </div>
        <section>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isSeller ? 'Sign In as Seller' : 'Sign In as Buyer'}
            </button>
            <h4 className="text-center my-4 text-gray-500">Or</h4>
            <Link
              to="/sign-up"
              className="w-full py-2 text-center bg-green-500 text-white rounded-md block hover:bg-green-600"
            >
              Sign Up
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
}

export default SignIn;

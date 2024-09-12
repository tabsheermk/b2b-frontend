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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
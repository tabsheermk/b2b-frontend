import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";

function SignUp() {
  
  const [name, setName] = useState("");
  const [businesName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isSeller, setIsSeller, isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const user = isSeller ? "sellers" : "buyers";


  const handleSwitch = () => {
    setIsSeller(!isSeller); // Toggle between buyer and seller
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/v1/${user}/signup`,
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
            value={name}
            onChange={(e) => setName(e.target.name)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.email)}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={businesName}
            onChange={(e) => setBusinessName(e.target.businesName)}
            placeholder="Business Name"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.password)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.confirmPassword)}
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
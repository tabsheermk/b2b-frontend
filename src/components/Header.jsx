import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import { server } from "../main";
import axios from "axios";

function Header() {
    const { isSeller, isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

    const user = isSeller ? "sellers" : "buyers";

    const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/${user}/logout`, {
        withCredentials: true,
      });

      setIsAuthenticated(false);
    } catch (error) {
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>B2B Marketplace</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to={"/sign-in"}>Login</Link>
        )}
      </article>
    </nav>
  );
}

export default Header;
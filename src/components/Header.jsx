import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import { server } from "../main";
import axios from "axios";

function Header() {
    const { isSeller, isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const user = isSeller ? "sellers" : "buyers";

    const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/api/v1/${user}/logout`, {
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
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">B2B Marketplace</h2>
      </div>
      <article className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-gray-800 transition">
          Home
        </Link>
        <Link to="/profile" className="text-gray-600 hover:text-gray-800 transition">
          Profile
        </Link>
        {isAuthenticated ? (
          <button
            disabled={loading}
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/sign-in"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Sign In
          </Link>
        )}
      </article>
    </nav>
  );
}

export default Header;
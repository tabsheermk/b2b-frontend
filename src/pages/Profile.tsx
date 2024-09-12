import React, { useContext } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

function LoadingSpinnerSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
        className="spinner_ajPY"
      />
    </svg>
  );
}

function Profile() {
  const { isAuthenticated, loading, user } = useContext(Context);
  console.log(user);

  if (!isAuthenticated) return <Navigate to="/sign-in" /> 

  return loading ? (
    <LoadingSpinnerSVG />
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{user?.name}</h1>
        <h2 className="text-xl text-gray-600 mb-2">{user?.business_name}</h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
}
export default Profile;
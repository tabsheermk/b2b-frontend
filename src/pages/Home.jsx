import React, { useContext } from 'react';
import { Context } from '../main';
import SellerDashboard from '../components/SellerDashboard';
import BuyerDashboard from '../components/BuyerDashboard';
import { Navigate } from 'react-router-dom';


function Home() {

  const {isAuthenticated, isSeller} = useContext(Context);

  if (!isAuthenticated) return <Navigate to="/sign-in" />

  return (
    <div className="">
      {
        false ? (
          <SellerDashboard />
        ) : (
          <BuyerDashboard />
        )
      }
    </div>
  )
}

export default Home;

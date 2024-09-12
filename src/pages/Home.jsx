import React, { useContext } from 'react';


function Home() {

  const {isAuthenticated, isSeller} = useContext(Context);

  if (!isAuthenticated) return <Navigate to="/sign-in" />

  return (
    <div className="">
      {
        true ? (
          <SellerDashboard />
        ) : (
          <BuyerDashboard />
        )
      }
    </div>
  )
}
import { Context } from '../main';
import SellerDashboard from '../components/SellerDashboard';
import { Navigate } from 'react-router-dom';

export default Home;

import React, { useContext } from 'react';


function Home() {

  const {isAuthenticated, isSeller} = useContext(Context);

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

export default Home;

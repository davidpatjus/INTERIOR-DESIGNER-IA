"use client"
import React, { useEffect, useState } from 'react';
import { UserDetailContext } from './_context/UserDetailContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { UserDetail } from './_interfaces/User';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

function Provider({ children }: { children: React.ReactNode }) {

  const [userDetail, setUserDetail] = useState<UserDetail>({
    id: '',
    name: '',
    email: '',
    imageUrl: '',
    credits: 0,
  });

  const { user } = useUser();
  
  const VerifyUser = async () => {
    const dataResult = await axios.post('/api/verify-user', { user });
    setUserDetail(dataResult.data.result);
  }

  useEffect(() => {
    if (user) {
      VerifyUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
        <div>
          {children}
        </div>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
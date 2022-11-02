import { createContext, useContext, useEffect, useState } from 'react';

export const OrderStartedContext = createContext();

export const useOrderStarted = () => useContext(OrderStartedContext);

export default function OrderStartedProvider({children}){
  const [orderStarted, setOrderStarted] = useState(true)

  useEffect(()=>{
    // console.log('order started in provider:', orderStarted)
  }, [orderStarted])

  return (
    <OrderStartedContext.Provider
      value={{orderStarted, setOrderStarted}}
    >
      {children}
    </OrderStartedContext.Provider>
  )
}

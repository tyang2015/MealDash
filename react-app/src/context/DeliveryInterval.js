import { createContext, useContext, useEffect, useState } from 'react';


export const DeliveryIntervalContext = createContext();

export const useDeliveryInterval = () => useContext(DeliveryIntervalContext);

export default function DeliveryIntervalProvider({children}){
  const [deliveryIntervalObj, setDeliveryIntervalObj] = useState(null)

  return (
    <DeliveryIntervalContext.Provider
      value={{deliveryIntervalObj, setDeliveryIntervalObj}}
    >
      {children}
    </DeliveryIntervalContext.Provider>
  )
}

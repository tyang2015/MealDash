import { createContext, useContext, useEffect, useState } from 'react';

export const CancelTimerContext = createContext();

export const useCancelTimer = () => useContext(CancelTimerContext);

export default function CancelTimerProvider({children}){
  const [cancelTimer, setCancelTimer] = useState(false)
  console.log('cancel timer state inside context provider:', cancelTimer)
  return (
    <CancelTimerContext.Provider
      value={{cancelTimer, setCancelTimer}}
    >
      {children}
    </CancelTimerContext.Provider>
  )
}

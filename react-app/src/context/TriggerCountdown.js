import { createContext, useContext, useEffect, useState } from 'react';

export const TriggerCountdownContext = createContext();

export const useTriggerCountdown = () => useContext(TriggerCountdownContext);

export default function TriggerCountdownProvider({children}){
  const [triggerCountdown, setTriggerCountdown] = useState(true)
  useEffect(()=>{
    console.log('trigger countdown in provider:', triggerCountdown)
  }, [triggerCountdown])

  return (
    <TriggerCountdownContext.Provider
      value={{triggerCountdown, setTriggerCountdown}}
    >
      {children}
    </TriggerCountdownContext.Provider>
  )
}

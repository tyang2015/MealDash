import { createContext, useContext, useState } from 'react';

export const ToggleCartContext = createContext();

export const useToggleCart = () => useContext(ToggleCartContext);

export default function ToggleCartProvider({children}){
  const [toggleCartPane, setToggleCartPane] = useState(false);

  return (
    <ToggleCartContext.Provider
      value={{toggleCartPane, setToggleCartPane}}
    >
      {children}
    </ToggleCartContext.Provider>
  )
}

import { createContext, useContext, useState } from 'react';

export const PriceDropdownContext = createContext();

export const UsePriceDropdown = () => useContext(PriceDropdownContext);

export default function PriceDropdownProvider({children}){
  const [togglePriceDropdown, setTogglePriceDropdown] = useState(false)

  return (
    <PriceDropdownContext.Provider
      value={{togglePriceDropdown, setTogglePriceDropdown}}
    >
      {children}
    </PriceDropdownContext.Provider>
  )
}

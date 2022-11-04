import { createContext, useContext, useState } from 'react';

export const RatingDropdown = createContext();

export const UseRatingDropdown = () => useContext(RatingDropdown);

export default function RatingDropdownProvider({children}){
  const [toggleRatingDropdown, setToggleRatingDropdown] = useState(false)

  return (
    <RatingDropdown.Provider
      value={{toggleRatingDropdown, setToggleRatingDropdown}}
    >
      {children}
    </RatingDropdown.Provider>
  )
}

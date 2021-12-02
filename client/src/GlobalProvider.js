import React, {useState, createContext} from "react";

export const GlobalContext = createContext([]);

export const GlobalProvider=(props)=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return(
    <div>
      <GlobalContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
        {props.children}
      </GlobalContext.Provider>
    </div>
  )
}

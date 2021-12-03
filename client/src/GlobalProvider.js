import React, {useState, createContext} from "react";

export const GlobalContext = createContext([]);

export const GlobalProvider=(props)=>{
  const [user, setUser] = useState()
  return(
    <div>
      <GlobalContext.Provider value={[user, setUser]}>
        {props.children}
      </GlobalContext.Provider>
    </div>
  )
}

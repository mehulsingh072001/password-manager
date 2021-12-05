import React, {useState, createContext} from "react";

export const GlobalContext = createContext([]);

export const GlobalProvider=(props)=>{
  const [user, setUser] = useState()
  const [showAdd, setShowAdd] = useState(false)
  return(
    <div>
      <GlobalContext.Provider value={{user:[user, setUser], add:[showAdd, setShowAdd]}}>
        {props.children}
      </GlobalContext.Provider>
    </div>
  )
}

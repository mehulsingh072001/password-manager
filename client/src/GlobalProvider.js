import React, {useState, createContext} from "react";

export const GlobalContext = createContext([]);

export const GlobalProvider=(props)=>{
  const [user, setUser] = useState()
  const [showAdd, setShowAdd] = useState(false)
  const [showFolders, setShowFolders] = useState([])
  return(
    <div>
      <GlobalContext.Provider value={{user:[user, setUser], add:[showAdd, setShowAdd], folders: [showFolders, setShowFolders]}}>
        {props.children}
      </GlobalContext.Provider>
    </div>
  )
}

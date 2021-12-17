import Sidebar from "../Components/Sidebar"
import {NavLink} from 'react-router-dom'
import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie';
import AddNew from '../Components/AddNew';
import {GlobalContext} from '../GlobalProvider'

function Folders(){
  const url = 'http://localhost:5000/api'
  const [cookies, setCookies] = useCookies(['userId, auth'])
  const {folders} = useContext(GlobalContext)
  const [showFolders, setShowFolders] = folders

  useEffect(() => {
    data()
  }, [])

  const data = async () => {
    await axios.get(`${url}/user/${cookies.userId}`, {headers:{Bearer: cookies.auth}})
      .then((response) => {setShowFolders(response.data.folders);})
  }
  
  return(
    <div className="container">
      <Sidebar/>
      <div className="folders">
        {showFolders.map(d => 
         <NavLink to={`/folders/${d.name.toLowerCase()}`} className="folders__folder">
            <i className="fas fa-folder"></i>
            <p className="folders__folder--name col-data" key={d._id}>{d.name}</p>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Folders

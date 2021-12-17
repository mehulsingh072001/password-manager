import {useLocation} from 'react-router'
import {useEffect, useState, useContext} from 'react';
import Sidebar from '../Components/Sidebar';
import axios from 'axios'
import { useCookies } from 'react-cookie';
import AddNew from '../Components/AddNew';
import { GlobalContext } from '../GlobalProvider';


function Folder(){
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  console.log(path)

  const url = 'http://localhost:5000/api'
  const [cookies, setCookies] = useCookies(['userId, auth'])
  const [cred, setCred] = useState([])
  const {user, add} = useContext(GlobalContext)
  const [showAdd, setShowAdd] = add

  useEffect(() => {
    data()
  }, [])

  const data = async () => {
    await axios.get(`${url}/user/${cookies.userId}`, {headers:{Bearer: cookies.auth}})
      .then((response) => {
        var folders = response.data.folders
        for(let i=0; folders.length > i; i++){
          if(folders[i].name.toLowerCase() === path){
            setCred(folders[i].credentials)
          }
        }
      })
  }

  const toggle = () => {
    setShowAdd(!showAdd)
  }

  const deleteCred = async (id) => {
    await axios.delete(`${url}/credentials/${id}`, {headers: {Bearer: cookies.auth}}).then((res) => console.log(res)).catch((res) => console.log(res))
  }


  return(
    <div>
      <Sidebar/>
      <button className="new" onClick={toggle}><i className="fas fa-plus"></i></button>
      {showAdd===true ? <AddNew/> : console.log('')}
      <div className="dashboard">
      <div className="searchbar">
        <input type="search" placeholder="Search..."/>
      </div>
          <table className="data">
            <tr className="u-margin-bottom-big">
              <th className="col-head">For</th>
              <th className="col-head">Username</th>
              <th className="col-head">Password</th>
            </tr>
            {cred.length > 0 ? cred.map(d => 
              <tr className="col-1" key={d._id}>
                <td><p className="col-data">Gmail</p></td>
                <td><p className="col-data">{d.username}</p></td>
                <td><p className="col-data">{d.password}</p></td>
                <td>
                  <button><i className="fas fa-key"></i></button>
                  <button><i className="fas fa-lock"></i></button>
                  <button onClick={() => deleteCred(d._id)}><i className="far fa-trash-alt"></i></button>
                </td>
              </tr>
            ) : console.log("nothing")}
          </table>
      </div>
    </div>
  )
}

export default Folder

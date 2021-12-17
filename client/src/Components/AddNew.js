import { GlobalContext } from '../GlobalProvider';
import { useCookies } from 'react-cookie';
import {useEffect, useState, useContext} from 'react';
import axios from 'axios';

function AddNew(){
  const {user, add} = useContext(GlobalContext)
  const [showAdd, setShowAdd] = add
  const [cookies, setCookies] = useCookies(['userId, auth'])
  const [label, setLabel] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [folder, setFolder] = useState('')
  const [fname, setFname] = useState('')
  const [credAdd, setCredAdd] = useState(false)
  const [folderAdd, setFolderAdd] = useState(false)
  const [csvAdd, setCsvAdd] = useState(false)
  const [showBtn, setShowBtn] = useState(true)
  const {folders} = useContext(GlobalContext)
  const [showFolders, setShowFolders] = folders
  const url = 'http://localhost:5000'

  const handleCredSubmit = async(e) => {
    e.preventDefault()
    const data = {
      label: label,
      username: username,
      password: password,
      folder: folder
    }
    try {
      //make axios post request
      await axios.post(`${url}/api/credentials/${cookies.userId}`, data,  {headers:{Bearer: cookies.auth}}).then(console.log('Success')).catch(err => console.log(err))
    }

    catch(err){
      console.log(err)
    }
  }

  const handleFolderSubmit = async(e) => {
    e.preventDefault()
    const data = {
      name: fname
    }
    try {
      //make axios post request
      await axios.post(`${url}/api/folder/${cookies.userId}`, data,  {headers:{Bearer: cookies.auth}}).then(console.log('Success')).catch(err => console.log(err))
    }

    catch(err){
      console.log(err)
    }
  }


  const handleCsvSubmit = async(e) => {
    //e.preventDefault()
    //const data = {
    //  file: fname
    //}
    //try {
    //  //make axios post request
    //  await axios.post(`${url}/api/folder/${cookies.userId}`, data,  {headers:{Bearer: cookies.auth}}).then(console.log('Success')).catch(err => console.log(err))
    //}
    //catch(err){
    //  console.log(err)
    //}
  }

  const toggle = () => {
    setShowAdd(!showAdd)
  }

  const credToggle = () => {
    setCredAdd(!credAdd)
    setShowBtn(!showBtn)
  }

  const folderToggle = () => {
    setFolderAdd(!folderAdd)
    setShowBtn(!showBtn)
  }

  const csvToggle = () => {
    setCsvAdd(!csvAdd)
    setShowBtn(!showBtn)
  }


  return(
    <div class="addnew">
      <button onClick={toggle} className="cancel">&times;</button>
      <div className="addnew__modal">
        <div className="addnew__content">
          <div className="addnew__content--credentials">
            <div className="addnew__content--credentials_card">
            {showBtn ? <button onClick={credToggle}>Credentials</button> : console.log(false)}
            </div>
          </div>
          <div className="addnew__content--folder">
            {showBtn ? <button onClick={folderToggle}>Folder</button> : console.log(false)}
          </div>
          <div className="addnew__content--csv">
            {showBtn ? <button onClick={csvToggle}>CSV</button> : console.log(false)}
          </div>
          {credAdd ? 
            <form>
              <input type="text" onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
              <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username/Email" />
              <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              <select onChange={(e) => setFolder(e.target.value)}  id="" name="">
                <option value="">None</option>
                {showFolders.map(d => 
                   <option value={d.name}>{d.name}</option>
                )}
              </select>
              <button className="submit" onClick={handleCredSubmit}>Submit</button>
            </form>
            : console.log('hwllo')
          }
          {folderAdd ? 
            <form>
              <input type="text" onChange={(e) => setFname(e.target.value)} placeholder="Folder Name" />
              <button className="submit" onClick={handleFolderSubmit}>Submit</button>
            </form>
            : console.log('hwllo')
          }
          {csvAdd ? 
            <form>
              <input type="file" onChange={(e) => setFname(e.target.value)} placeholder="Folder Name" />
              <button className="submit" onClick={handleCsvSubmit}>Submit</button>
            </form>
            : console.log('hwllo')
          }
        </div>
      </div>
    </div>
  )
}

export default AddNew

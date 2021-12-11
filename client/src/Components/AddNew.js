import { GlobalContext } from '../GlobalProvider';
import { useCookies } from 'react-cookie';
import {useState, useContext} from 'react';
import axios from 'axios';


function AddNew(){
  const {user, add} = useContext(GlobalContext)
  const [showAdd, setShowAdd] = add
  const [cookies, setCookies] = useCookies(['userId, auth'])
  const [label, setLabel] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    const url = 'http://localhost:5000'
    const data = {
      label: label,
      username: username,
      password: password
    }
    try {
      //make axios post request
      await axios.post(`${url}/api/credentials/${cookies.userId}`, data,  {headers:{Bearer: cookies.auth}}).then(console.log('Success')).catch(err => console.log(err))
    }

    catch(err){
      console.log(err)
    }
  }

  const toggle = () => {
    setShowAdd(!showAdd)
  }

  return(
    <div class="addnew">
      <button onClick={toggle} className="cancel">&times;</button>
      <div className="addnew__modal">
        <div className="addnew__content">
          <form>
            <input type="text" onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username/Email" />
            <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button className="submit" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNew

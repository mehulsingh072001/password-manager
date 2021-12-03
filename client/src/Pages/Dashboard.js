import Nav from '../Components/Nav'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import {useEffect, useState} from 'react';

function Dashboard() {
  const url = 'http://localhost:5000/api'
  const [cookies, setCookies] = useCookies(['userId, auth'])
  const [user, setUser] = useState()
  const [cred, setCred] = useState([])

  useEffect(() => {
    data()
  }, [])

  const data = async () => {
    await axios.get(`${url}/user/${cookies.userId}`, {headers:{Bearer: cookies.auth}})
      .then((response) => {setCred(response.data.credentials)})
    cred.map( d => console.log(d))
  }

  return(
    <div>
      <Nav/>
      <button className="new"><i className="fas fa-plus"></i></button>
      <div className="dashboard">
        <button onClick={data}>Hello</button>


        <section className="data">
          <div className="col-1">
            <h2 className="col-head">For</h2>
            <p className="col-data">Gmail</p>
          </div>
          <div className="col-2">
            <h2 className="col-head">Username</h2>
            {cred.map(d => <p className="col-data">{d.username}</p>)}
          </div>
          <div className="col-3">
            <h2 className="col-head">Password</h2>
            {cred.map(d => <p className="col-data">{d.password}</p>)}
          </div>
            <div className="col-4">
                <i className="fas fa-lock"></i>
            </div>
            <div className="col-5">
                <i className="fas fa-key"></i>
            </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard

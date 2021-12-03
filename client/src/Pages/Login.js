import { useState, useContext } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { GlobalContext } from '../GlobalProvider'

function Login(){
  let navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookies] = useCookies(["userId","auth", "isAuthenticated"])

  const handleCookie = (token, id) => {
    setCookies("auth", token, {path: "/"})
    setCookies("userId", id, {path: "/"})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const url = 'http://localhost:5000'
    const data = {
      email: username,
      password: password
    }
    try {
      //make axios post request
      await axios.post(`${url}/api/login`, data)
        .then(res => handleCookie(res.data.token, res.data.id), setCookies("isAuthenticated", true, {path: "/"}), navigate('/'))
        .catch(err => console.log(err));
    }

    catch(err){
      console.log(err)
    }
  }

  return(
    <div>
      <div className="login">
        <form className="login__form">
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username or Email"/>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={handleSubmit} className="login__form--submit">Login</button>
        </form>

        <div className="seprator">
          <div className="line"></div>
          <p>Or</p>
          <div className="line"></div>
        </div>

        <Link to="/register" className="cta-register">Register</Link>
      </div>
    </div>
  )
}

export default Login

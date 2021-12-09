import { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import Nav from '../Components/Nav'

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
    //make axios post request
    await axios.post(`${url}/api/login`, data)
      .then(res => {
        if(res.status===200){
          handleCookie(res.data.token, res.data.id);
          setCookies("isAuthenticated", true, {path: "/"});
          navigate('/')
        }
        else{
          console.log('Auth Failed')
        }
      }).catch((err) => {
        console.log(err.response.status)
      })
      
    }

  return(
    <div>
      <Nav/>
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

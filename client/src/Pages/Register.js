import { useState } from 'react'
import axios from 'axios'
import Nav from '../Components/Nav'

function Register(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    const url = 'http://localhost:5000'
    const data = {
      username: username,
      email: email,
      password: password
    }
    try {
      //make axios post request
      await axios.post(`${url}/api/users`, data).then()
    }

    catch(err){
      console.log(err)
    }
  }

  return(
    <div>
      <Nav/>
      <div className="registration">
        <form className="registration__form" action="">
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button onClick={handleSubmit} className="cta-register">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register

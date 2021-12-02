import {Link} from 'react-router-dom'
function Login(){
  return(
    <div>
      <div className="login">
        <form action="" className="login__form">
          <input type="text" placeholder="Username or Email"/>
          <input type="password" placeholder="Password" />
          <button className="login__form--submit">Login</button>
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

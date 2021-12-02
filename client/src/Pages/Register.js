function Register(){
  return(
    <div className="registration">
      <form className="registration__form" action="">
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password"/>
        <button className="cta-register">Sign Up</button>
      </form>
    </div>
  )
}

export default Register

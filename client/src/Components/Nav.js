import {useCookies} from 'react-cookie'

function Nav(){
  const [cookies, setCookies, removeCookies] = useCookies(["isAuthenticated"])
  const destroyAuth = (e) => {
    e.preventDefault()
    removeCookies('isAuthenticated')
  }
  return(
    <nav className="nav">
      <p className="nav__logo">Credman</p>
      <input className="nav__search" type="search" placeholder="Search..."/>
      <div>
        <i className="far fa-user-circle nav__profile"></i>
        <i onClick={destroyAuth} className="fas fa-sign-out-alt nav__logout"></i>
      </div>
    </nav>
  )
}

export default Nav

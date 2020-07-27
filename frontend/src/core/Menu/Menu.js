import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import './Menu.scss'
import logo from '../../images/logo.png'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return 'active'
  } else {
    return ''
  }
}

const Menu = ({ history }) => {
  return (
    <div className='main-menu'>
      <div className='container'>
        <div className='logo'>
          <Link className='logo-link' to='/'>
            <img src={logo} alt='Art Dealers' />
          </Link>
        </div>

        <ul className='nav'>
          <li className='nav-item'>
            <Link className={`nav-link ${isActive(history, '/')}`} to='/'>
              Home
            </Link>
            <Link
              className={`nav-link ${isActive(history, '/signin')}`}
              to='/signin'
            >
              Signin
            </Link>
            <Link
              className={`nav-link ${isActive(history, '/signup')}`}
              to='/signup'
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Menu)

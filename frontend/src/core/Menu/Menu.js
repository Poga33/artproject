import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { signout, isAuthenticated } from '../../auth/index'

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
          </li>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className='nav-item'>
              <Link
                className={`nav-link ${isActive(history, '/user/dashboard')}`}
                to='/user/dashboard'
              >
                Dashboard
              </Link>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className='nav-item'>
              <Link
                className={`nav-link ${isActive(history, '/admin/dashboard')}`}
                to='/admin/dashboard'
              >
                Dashboard
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${isActive(history, '/signin')}`}
                  to='/signin'
                >
                  Sign in
                </Link>
              </li>

              <li className='nav-item'>
                <Link
                  className={`nav-link ${isActive(history, '/signup')}`}
                  to='/signup'
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && (
            <li className='nav-item'>
              <span
                onClick={() => signout(() => history.push('/'))}
                className='nav-link'
              >
                Signout
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Menu)

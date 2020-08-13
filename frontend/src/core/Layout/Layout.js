import React from 'react'

import Menu from '../Menu/Menu'
import './Layout.scss'

const Layout = ({ title, children }) => {
  return (
    <div className='container'>
      <Menu />
      {title && (
        <div className='jumbotron'>
          <h1>{title}</h1>
        </div>
      )}
      {children}
    </div>
  )
}

export default Layout

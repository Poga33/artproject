import React from 'react'

import Menu from '../Menu/Menu'
import './Layout.scss'

const Layout = ({ title = 'Title', children, className }) => {
  return (
    <div className='container'>
      <Menu />
      <div className='jumbotron'>
        <h1>{title}</h1>
      </div>

      {children}
    </div>
  )
}

export default Layout

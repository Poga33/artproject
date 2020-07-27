import React from 'react'

import Menu from '../Menu/Menu'

const Layout = ({
  title = 'Title',
  description = 'Description',
  children,
  className
}) => {
  return (
    <div className='container'>
      <Menu />
      <div className='jumbotron'>
        <h2>{title}</h2>
        <p className='lead'>{description}</p>
      </div>

      {children}
    </div>
  )
}

export default Layout

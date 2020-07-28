import React from 'react'
import { Link } from 'react-router-dom'

import Layout from '../../core/Layout/Layout'
import { isAuthenticated } from '../../auth/index'

import '../UserDashboard/UserDashboard.scss'

const AdminDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated()

  const adminLinks = () => {
    return (
      <div className='user-links'>
        <h3 className='card-title'>Admin Links</h3>
        <ul className='card-list'>
          <li>
            <Link to='/create/category'>Create Category</Link>
          </li>
          <li>
            <Link to='/create/product'>Create Product</Link>
          </li>
        </ul>
      </div>
    )
  }

  const adminInfo = () => {
    return (
      <div className='user-info'>
        <h3 className='card-title'>User Information</h3>
        <ul className='card-list'>
          <li>
            <span>Name:</span> {name}
          </li>
          <li>
            <span>E-mail:</span> {email}
          </li>
          <li>
            <span>Role:</span> {role === 1 ? 'Admin' : 'Registered User'}
          </li>
        </ul>
      </div>
    )
  }

  return (
    <Layout title={`Welcome to your dashboard, ${name}!`}>
      <div className='user-wrapper'>
        <div className='card user-links-col'>{adminLinks()}</div>
        <div className='card user-info-col'>{adminInfo()}</div>
      </div>
    </Layout>
  )
}

export default AdminDashboard

import React from 'react'
import { Link } from 'react-router-dom'

import Layout from '../../core/Layout/Layout'
import { isAuthenticated } from '../../auth/index'

import './UserDashboard.scss'

const UserDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated()

  const userLinks = () => {
    return (
      <div className='user-links'>
        <h3 className='card-title'>Quick Links</h3>
        <ul className='card-list'>
          <li>
            <Link to='/cart'>My Cart</Link>
          </li>
          <li>
            <Link to='/profile/update'>Update Profile</Link>
          </li>
        </ul>
      </div>
    )
  }

  const userInfo = () => {
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

  const purchaseHistory = () => {
    return (
      <div className='user-history'>
        <h3 className='card-title'>Purchase History</h3>
        <ul className='card-list'>
          <li>History</li>
        </ul>
      </div>
    )
  }

  return (
    <Layout title={`Welcome to your dashboard, ${name}!`}>
      <div className='user-wrapper'>
        <div className='card user-links-col'>{userLinks()}</div>
        <div className='card user-info-col'>
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  )
}

export default UserDashboard

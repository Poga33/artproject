import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { isAuthenticated } from '../../auth/index'

import './Checkout.scss'

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  return (
    <div className='checkout'>
      <h2 className='checkout-title'>Total: {getTotal()} LEI</h2>
      {isAuthenticated() ? (
        <button className='btn btn-primary'>checkout</button>
      ) : (
        <button className='btn btn-primary'>
          <Link to='signin'>go to sign in</Link>
        </button>
      )}
    </div>
  )
}

export default Checkout

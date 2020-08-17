import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'

import { isAuthenticated } from '../../auth/index'
import { getBraintreeClientToken, processPayment } from '../apiCore'
import { emptyCart } from '../Cart/cartHelpers'

import './Checkout.scss'

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
    successPaymentMessage: ''
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({ ...data, error: data.error })
      } else {
        setData({ clientToken: data.clientToken })
      }
    })
  }

  useEffect(() => {
    getToken(userId, token)
  }, [token, userId])

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const buy = () => {
    setData({ ...data, loading: true })
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce
        // once you have nonce (card type, card number), send nonce as "paymentMethodNonce"
        // and also total to be charged
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        }
        processPayment(userId, token, paymentData)
          .then(response => {
            setData({ ...data, success: response.success })
            console.log('ii adevarat?', data.success)
            emptyCart(() => {
              setData({
                ...data,
                successPaymentMessage:
                  'Thanks for buying from ART DEALERS, check your e-mail!',
                loading: false
              })
            })

            // create order
          })
          .catch(error => {
            setData({ ...data, loading: false })
          })
      })
      .catch(error => {
        setData({ ...data, error: error.message })
      })
  }

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 && !data.success ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <button onClick={buy} className='btn btn-primary'>
            Pay
          </button>
        </div>
      ) : null}
    </div>
  )

  return (
    <div className='checkout'>
      {data.loading && <p className='loading'>loading...</p>}
      <h2 className='checkout-title'>Total: {getTotal()} LEI</h2>
      <p
        style={{ display: data.error ? '' : 'none' }}
        className='notification error'
      >
        {data.error}
      </p>
      <p
        style={{ display: data.success ? '' : 'none' }}
        className='notification success'
      >
        Thanks, your payment was successful!
      </p>
      <p
        style={{ display: data.successPaymentMessage ? '' : 'none' }}
        className='notification success'
      >
        {data.successPaymentMessage}
      </p>
      {isAuthenticated() ? (
        showDropIn()
      ) : (
        <button className='btn btn-primary'>
          <Link to='signin'>go to sign in</Link>
        </button>
      )}
    </div>
  )
}

export default Checkout

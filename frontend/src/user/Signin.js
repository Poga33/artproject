import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import Layout from '../core/Layout/Layout'
import { signin, authenticate } from '../auth/index'

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  })

  const { email, password, error, loading, redirectToReferrer } = values

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setValues({ ...values, error: false, loading: true })

    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false })
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          })
        })
      }
    })
  }

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showLoading = () => loading && <div className='spinner'>loading...</div>

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to='/' />
    }
  }

  const signInForm = () => (
    <form>
      <h2 className='form-title'>Sign In and start shopping</h2>

      <div className='form-group'>
        <input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          value={email}
          placeholder='Email'
        />
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange('password')}
          type='password'
          className='form-control'
          value={password}
          placeholder='Password'
        />
      </div>

      <button onClick={handleSubmit} className='btn-primary'>
        Submit
      </button>
    </form>
  )

  return (
    <Layout title='Sign In Page'>
      <div className='signin-form form-container'>
        {showLoading()}
        {signInForm()}
        {showError()}
        {redirectUser()}
      </div>
    </Layout>
  )
}

export default Signin

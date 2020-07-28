import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Layout from '../core/Layout/Layout'
import { signup } from '../auth/index'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const { name, email, password, error, success } = values

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setValues({ ...values, error: false })

    signup({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false })
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
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

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      Your new account was created!
      <div className='signin-success'>
        <Link to='/signin'>Sign in</Link>
      </div>
    </div>
  )

  const signUpForm = () => (
    <form>
      <h2 className='form-title'>Looking for art? Sign Up below!</h2>

      <div className='form-group'>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
          placeholder='Name'
        />
      </div>

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
    <Layout title='Sign Up Page'>
      <div className='signup-form form-container'>
        {signUpForm()}
        {showSuccess()}
        {showError()}
      </div>
    </Layout>
  )
}

export default Signup

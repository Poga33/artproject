import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Layout from '../core/Layout/Layout'
import { isAuthenticated } from '../auth'
import { createCategory } from './apiAdmin'

import './AddCategory.scss'

const AddCategory = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated()

  const handleChange = e => {
    setError('')
    setSuccess('')
    setName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    // make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setError('')
        setSuccess(true)
      }
    })
  }

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <h2 className='form-title'>Your category name</h2>

      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Name'
          value={name}
          onChange={handleChange}
          autoFocus
          required
        />
      </div>
      <button className='btn-primary'>Create Category</button>
    </form>
  )

  const showSuccess = () => {
    if (success) {
      return <h3 className='alert alert-info'>{name} was created</h3>
    }
  }

  const showError = () => {
    if (error) {
      return (
        <h3 className='alert alert-danger'>Category name should be unique</h3>
      )
    }
  }

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='back-link'>
        Back to Dashboard
      </Link>
    </div>
  )

  return (
    <Layout title='Add a new category'>
      <div className='addCategory-form form-container'>
        {newCategoryForm()}
        {showError()}
        {showSuccess()}
        {goBack()}
      </div>
    </Layout>
  )
}

export default AddCategory

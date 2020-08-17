import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

import Layout from '../core/Layout/Layout'
import { isAuthenticated } from '../auth'
import { createProduct } from './apiAdmin'
import { getCategories } from '../core/apiCore'

const AddProduct = () => {
  const { user, token } = isAuthenticated()

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  })

  // load categories and set form data
  const init = useCallback(() => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, categories: data, formData: new FormData() })
      }
    })
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    values.formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setValues({ ...values, error: '', loading: true })

    createProduct(user._id, token, values.formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: data.name
        })
      }
    })
  }

  const newProductForm = () => (
    <form onSubmit={handleSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <input
          onChange={handleChange('photo')}
          type='file'
          name='photo'
          accept='image/*'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={values.name}
          placeholder='Name'
        />
      </div>

      <div className='form-group'>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={values.description}
          placeholder='Description'
        />
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={values.price}
          placeholder='Price'
        />
      </div>

      <div className='form-group'>
        <select onChange={handleChange('category')} className='form-control'>
          <option>Select Category</option>
          {values.categories &&
            values.categories.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              )
            })}
        </select>
      </div>

      <div className='form-group'>
        <select onChange={handleChange('shipping')} className='form-control'>
          <option>Shipping available?</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className='form-control'
          value={values.quantity}
          placeholder='Quantity'
        />
      </div>

      <button className='btn btn-primary'>Create Product</button>
    </form>
  )

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='back-link'>
        Back to Dashboard
      </Link>
    </div>
  )

  const showError = () => {
    if (values.error) {
      return <h3 className='alert alert-danger'>{values.error}</h3>
    }
  }

  const showSuccess = () => {
    if (values.createdProduct) {
      return (
        <h3 className='alert alert-info'>{`${values.createdProduct} was created!`}</h3>
      )
    }
  }

  return (
    <Layout title='Add a new product'>
      <div className='addProduct-form form-container'>
        {values.loading && values.errror === '' ? (
          <div>loading...</div>
        ) : (
          newProductForm()
        )}
        {showError()}
        {showSuccess()}
        {goBack()}
      </div>
    </Layout>
  )
}

export default AddProduct

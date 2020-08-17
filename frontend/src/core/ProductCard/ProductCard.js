import React, { useState } from 'react'
import moment from 'moment'
import { Link, Redirect } from 'react-router-dom'

import { addItem } from '../Cart/cartHelpers'

import ShowImage from './ShowImage'

import './ProductCard.scss'

const ProductCard = ({ product, third, half, full, isSingleProduct }) => {
  const [redirect, setRedirect] = useState(false)

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to='/cart' />
    }
  }

  return (
    <div
      className={`product-card ${
        isSingleProduct ? 'product-card-single' : ''
      } ${third ? 'product-card-third' : ''} ${
        full ? 'product-card-full' : ''
      }${half ? 'product-card-half' : ''}`}
    >
      <div className='card-body'>
        {shouldRedirect(redirect)}

        <ShowImage item={product} url='product' />
        {!isSingleProduct && <h3 className='product-title'>{product.name}</h3>}

        {isSingleProduct && (
          <div className='product-details'>
            <h3 className='product-title'>{product.name}</h3>
            <ul>
              <li>Pret: {product.price} Lei</li>
              <li>Added on: {moment(product.createdAt).fromNow()}</li>
              <li>Category: {product.category && product.category.name}</li>
              <li>
                Stock:
                {product.quantity > 0 ? (
                  <span> In Stock</span>
                ) : (
                  <span> Out of stock</span>
                )}
              </li>
            </ul>
          </div>
        )}

        <p className='product-description'>
          {isSingleProduct
            ? product.description
            : `${product.description.substring(0, 40)}...`}
        </p>
        {!isSingleProduct && (
          <p className='product-price'>{product.price} Lei</p>
        )}
      </div>
      <div className='product-cta'>
        {!isSingleProduct && (
          <Link to={`/product/${product._id}`}>
            <button className='btn btn-secondary'>view product</button>
          </Link>
        )}

        <button onClick={addToCart} className='btn btn-secondary'>
          add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard

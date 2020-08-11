import React from 'react'
import { Link } from 'react-router-dom'

import ShowImage from './ShowImage'

import './ProductCard.scss'

const ProductCard = ({ product, third, half }) => {
  return (
    <div
      className={`product-card ${third ? 'product-card-third' : ''} ${
        half ? 'product-card-half' : ''
      }`}
    >
      <div className='card-body'>
        <ShowImage item={product} url='product' />
        <h3 className='product-title'>{product.name}</h3>
        <p className='product-description'>
          {`${product.description.substring(0, 100)} ...`}
        </p>
        <p className='product-price'>{product.price} Lei</p>
      </div>
      <div className='product-cta'>
        <Link to='/'>
          <button className='btn btn-secondary'>view product</button>
        </Link>
        <Link to='/'>
          <button className='btn btn-secondary'>add to cart</button>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard

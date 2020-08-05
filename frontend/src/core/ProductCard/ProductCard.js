import React from 'react'
import { Link } from 'react-router-dom'

import ShowImage from './ShowImage'

import './ProductCard.scss'

const ProductCard = ({ product }) => {
  return (
    <div className='product-card'>
      <h3>{product.name}</h3>
      <div className='card-body'>
        <ShowImage item={product} url='product' />
        <p>{product.description}</p>
        <p>{product.price}</p>
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

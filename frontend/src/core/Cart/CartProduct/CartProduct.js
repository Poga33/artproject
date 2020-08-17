import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { updateItem, removeItem } from '../cartHelpers'
import ShowImage from '../../ProductCard/ShowImage'

import './CartProduct.scss'

const CartProduct = ({ product, run = undefined, setRun = f => f }) => {
  const [count, setCount] = useState(product.count)

  const handleChange = productId => event => {
    setRun(!run)
    setCount(event.target.value < 1 ? 1 : event.target.value)

    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  return (
    <div className='cart-product'>
      <div className='image'>
        <ShowImage item={product} url='product' />
      </div>
      <div className='details'>
        <h3 className='product-title'>{product.name}</h3>
        <p>
          <span>Pret</span>: {product.price} LEI
        </p>
        <p>
          <span>Categorie</span>: {product.category && product.category.name}
        </p>
        <p>
          <span>Stock</span>:
          {product.quantity > 0 ? (
            <span className='stock-badge stock-available'> Disponibil</span>
          ) : (
            <span className='stock-badge stock-unavailable'> Indisponibil</span>
          )}
        </p>
        <div className='product-quantity'>
          <p>
            <span>Cantitate</span>
          </p>
          <input
            type='number'
            className='form-control'
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
        <div className='buttons'>
          <Link to={`/product/${product._id}`}>
            <button className='btn btn-secondary'>view product</button>
          </Link>
          <button
            onClick={() => {
              removeItem(product._id)
              setRun(!run)
            }}
            className='btn btn-primary'
          >
            remove product
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartProduct

import React, { useEffect, useState } from 'react'

import { getCart } from './cartHelpers'
import Layout from '../Layout/Layout'
import CartProduct from './CartProduct/CartProduct'
import Checkout from '../Checkout/Checkout'

import './Cart.scss'

const Cart = () => {
  const [items, setItems] = useState([])
  const [run, setRun] = useState(false)

  useEffect(() => {
    setItems(getCart())
  }, [run])

  return (
    <Layout title='Cosul de cumparaturi'>
      <div className='cart-wrapper'>
        <div className='cart-items col'>
          <h2 className='products-section-title'>
            Cosul tau are {items.length}&nbsp;
            {`${items.length > 1 || items.length === 0 ? 'produse' : 'produs'}`}
          </h2>
          {items.length > 0 &&
            items.map((item, index) => {
              return (
                <CartProduct
                  key={index}
                  product={item}
                  run={run}
                  setRun={setRun}
                />
              )
            })}
          {items.length === 0 && <div>no items here</div>}
        </div>
        <div className='cart-info col'>
          <h2 className='products-section-title'>Rezumatul cosului</h2>
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  )
}

export default Cart

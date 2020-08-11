import React, { useState, useEffect } from 'react'

import { getProducts } from '../apiCore'
import Layout from '../Layout/Layout'
import ProductCard from '../ProductCard/ProductCard'
import Search from '../Search/Search'

import './Home.scss'

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProductsBySell(data)
      }
    })
  }

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProductsByArrival(data)
      }
    })
  }

  useEffect(() => {
    loadProductsBySell()
    loadProductsByArrival()
  }, [])

  return (
    <Layout title='Home Page'>
      <Search />
      <h2 className='products-section-title'>New Products</h2>
      <section className='products-wrapper'>
        {productsByArrival.map((product, index) => {
          return <ProductCard key={index} product={product} />
        })}
      </section>
      <hr className='sections-separator' />
      <h2 className='products-section-title'>Best sellers</h2>
      <section className='products-wrapper'>
        {productsBySell.map((product, index) => {
          return <ProductCard key={index} product={product} />
        })}
      </section>
    </Layout>
  )
}

export default Home

import React, { useState, useEffect } from 'react'

import { getProducts } from '../apiCore'
import Layout from '../Layout/Layout'
import ProductCard from '../ProductCard/ProductCard'

import './Shop.scss'

const Shop = () => {
  return (
    <Layout title='Shop Page'>
      <aside className='col sidebar'>sidebar</aside>
      <section className='col main-content'>main content</section>
    </Layout>
  )
}

export default Shop

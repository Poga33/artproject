import React, { useState, useEffect } from 'react'

import { getCategories, getFilteredProducts } from '../apiCore'
import Layout from '../Layout/Layout'
import Checkbox from '../Checkbox/Checkbox'
import RadioBox from '../RadioBox/RadioBox'
import { prices } from '../FixedPrices/fixedPrices'

import './Shop.scss'

const Shop = () => {
  const [categories, setCategories] = useState([])
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: []
    }
  })
  const [error, setError] = useState(false)
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0)
  const [filteredResults, setFilteredResults] = useState(0)

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    })
  }

  const loadFilteredResults = newFilters => {
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults(data)
      }
    })
  }

  useEffect(() => {
    init()
    loadFilteredResults(skip, limit, myFilters.filters)
  }, [])

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }

    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters)
  }

  const handlePrice = value => {
    const data = prices
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }

    return array
  }

  return (
    <Layout title='Shop Page'>
      <div className='shop-wrapper'>
        <aside className='col sidebar'>
          <h2 className='col-title'>Filter by Categories</h2>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, 'category')}
            />
          </ul>

          <h2 className='col-title'>Filter by Prices</h2>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={filters => handleFilters(filters, 'price')}
            />
          </div>
        </aside>
        <section className='col main-content'>
          {JSON.stringify(filteredResults)}
        </section>
      </div>
    </Layout>
  )
}

export default Shop

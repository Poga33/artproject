import React, { useEffect, useState } from 'react'

import ProductCard from '../ProductCard/ProductCard'

import { getCategories, list } from '../apiCore'

import './Search.scss'

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  })

  const { categories, category, search, searched, results } = data

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setData({ ...data, categories: data })
      }
    })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const searchSubmit = e => {
    e.preventDefault()
    if (search) {
      list({ search: search || undefined, category }).then(response => {
        if (response.error) {
          console.log(response.error)
        } else {
          setData({ ...data, results: response, searched: true })
        }
      })
    }
  }

  const handleChange = name => e => {
    setData({ ...data, [name]: e.target.value, searched: false })
  }

  const searchForm = () => {
    return (
      <form className='search-form' onSubmit={searchSubmit}>
        <div className='flex-item'>
          <select className='form-control' onChange={handleChange('category')}>
            <option value='All'>All</option>
            {categories.map((c, i) => {
              return (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className='flex-item search-bar'>
          <input
            type='search'
            className='form-control'
            onChange={handleChange('search')}
            placeholder='Search by name'
          />
        </div>
        <div className='flex-item'>
          <button className='btn btn-primary'>Search</button>
        </div>
      </form>
    )
  }

  const searchedMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} ${
        results.length === 1 ? 'product' : 'products'
      }!`
    } else if (searched && results.length < 1) {
      return 'No products found!'
    }
  }

  const searchedProducts = (results = []) => {
    return (
      <>
        <h2>{searchedMessage(searched, results)}</h2>
        <div className='products-wrapper products-search-wrapper'>
          {results.map((product, i) => {
            return <ProductCard key={i} product={product} />
          })}
        </div>
      </>
    )
  }

  return (
    <>
      <div className='search-bar-wrapper'>{searchForm()}</div>
      {searchedProducts(results)}
    </>
  )
}

export default Search

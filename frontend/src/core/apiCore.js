import { API } from '../config'
import querryString from 'query-string'

export const getProducts = sortBy => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = { skip, limit, filters }

  return fetch(`${API}/products/by/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const list = params => {
  const query = querryString.stringify(params)

  return fetch(`${API}/products/search?${query}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const readSingleProduct = pId => {
  return fetch(`${API}/product/${pId}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const listRelatedProducts = productId => {
  return fetch(`${API}/products/related/${productId}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.log(error))
}

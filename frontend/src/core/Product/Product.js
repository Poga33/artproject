import React, { useEffect, useState } from 'react'

import { readSingleProduct, listRelatedProducts } from '../apiCore'

import Layout from '../Layout/Layout'
import ProductCard from '../ProductCard/ProductCard'

import './Product.scss'

const Product = props => {
  const [product, setProduct] = useState({})
  const [relatedProduct, setRelatedProduct] = useState([])
  const [error, setError] = useState(false)

  const loadSingelProduct = pId => {
    readSingleProduct(pId).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProduct(data)

        //fetch related products
        listRelatedProducts(data._id).then(data => {
          if (data.error) {
            setError(data.error)
          } else {
            setRelatedProduct(data)
          }
        })
      }
    })
  }

  useEffect(() => {
    const productId = props.match.params.productId
    loadSingelProduct(productId)
  }, [props])

  return (
    <>
      <Layout>
        {product && product.description && (
          <div className='single-product-wrapper'>
            <div className='product'>
              <ProductCard full isSingleProduct product={product} />
            </div>

            <div className='related-products'>
              <h4>alte produse din aceeasi categorie</h4>
              {/* related products shown based on the same category */}
              {relatedProduct.length === 0 && (
                <div>no related products found</div>
              )}
              {relatedProduct.map((product, i) => {
                return <ProductCard key={i} product={product} />
              })}
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}

export default Product

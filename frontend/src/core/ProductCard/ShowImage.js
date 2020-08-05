import React from 'react'
import { API } from '../../config'

import './ShowImage.scss'

const ShowImage = ({ item, url }) => {
  return (
    <div className='product-image'>
      <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} />
    </div>
  )
}

export default ShowImage

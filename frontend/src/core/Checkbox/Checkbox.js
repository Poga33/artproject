import React, { useState } from 'react'

import './Checkbox.scss'

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([])

  const handleToggle = c => () => {
    const currentCategoryId = checked.indexOf(c)
    const newCheckedCategoryId = [...checked]

    // if you click on a category checkbox and the id of that category is not in the state, then push it in the array
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c)
    } else {
      // if it's in the state, remove it when you click again
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }

    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  }

  return categories.map((c, i) => {
    return (
      <li key={i} className='checkbox-list'>
        <input
          onChange={handleToggle(c._id)}
          id={c.name}
          value={checked.indexOf(c._id === -1)}
          type='checkbox'
          className='form-checkbox'
        />
        <label htmlFor={c.name} className='form-checkbox-label'>
          {c.name}
        </label>
      </li>
    )
  })
}

export default Checkbox

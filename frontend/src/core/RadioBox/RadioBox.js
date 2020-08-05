import React, { useState } from 'react'

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0)

  const handleChange = e => {
    handleFilters(e.target.value)
    setValue(e.target.value)
  }

  return prices.map((p, i) => {
    return (
      <div key={i} className='radio-wrapper'>
        <input
          onChange={handleChange}
          id={p.name}
          name={p}
          value={`${p._id}`}
          type='radio'
          className='form-checkbox'
        />
        <label htmlFor={p.name} className='form-checkbox-label'>
          {p.name}
        </label>
      </div>
    )
  })
}

export default RadioBox

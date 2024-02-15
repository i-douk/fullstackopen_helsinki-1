import React from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with: <input value={props.searchQuery} onChange={props.handleChangeSearch} />
    </div>
  )
}

export default Filter

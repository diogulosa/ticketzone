import React from 'react'

import './FilterButton.css'

function FilterButton(props) {

  return (
    <button type="button" value={props.value} className={props.className ? `filter-btn ${props.className}`: `filter-btn`} name={props.name} onClick={props.onClick}>{props.children}</button>
  )
}

export default FilterButton
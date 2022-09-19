import React from 'react'
import './RadioButton.css'

function RadioButton(props) {
  return (
    <div className='radio-btn-container'>
        <input type="radio" id={props.id} name={props.name} value={props.value} checked={props.checked} onChange={props.onChange} onClick={props.onClick} defaultChecked={props.defaultChecked} />
        <label htmlFor={props.id}>{props.label}</label>
    </div>
  )
}

export default RadioButton
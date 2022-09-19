import React from 'react'
import './Button.css'

function Button(props) {
  return (
    <button
        type={'button' || props.type}
        style={props.style} 
        className={props.className ? `btn ${props.className}` : 'btn'} 
        onClick={props.onClick}
        id={props.id}
        disabled={props.disabled}
    >{props.children}</button>
  )
}

export default Button
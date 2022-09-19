import React, { useState } from 'react'
import './Input.css'

function Input(props) {

    const [style, setStyle] = useState('')

    function handleFocus(e){
        setStyle('')
    }

    function handleBlur(e){
        setStyle('')
    }

    return (
        <>
        <div style={props.containerStyle} className={`fe-element ${style ? style :props.className}`}>
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type} id={props.id} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} onFocus={handleFocus} onBlur={handleBlur} step={props.step} onKeyDown={props.onKeyDown} onInput={props.onInput} pattern={props.pattern} required={props.required} disabled={props.disabled} />
        </div>
        </>      
    )
}


export default Input
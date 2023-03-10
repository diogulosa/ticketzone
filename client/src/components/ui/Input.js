import React, { useState } from 'react'
import './Input.css'

function Input(props) {

    const [isFocused, setIsFocused] = useState(false)
    
    return (
        <>
        <div style={props.containerStyle} className={isFocused ? 'fe-element focused' : props.hasError ? 'fe-element hasError' : 'fe-element'}>
            <label htmlFor={props.name}>{props.label} <span>{props.required ? ' *' : null}</span></label>
            <input type={props.type} id={props.id} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} onFocus={e=> setIsFocused(true)} onBlur={e => setIsFocused(false)} step={props.step} onKeyDown={props.onKeyDown} onInput={props.onInput} pattern={props.pattern} required={props.required} disabled={props.disabled} />
        </div>
        </>      
    )
}


export default Input
import React, { useState } from 'react'
import './Select.css'


function Select({name, className, options = [], label, value, onChange, required}) {

  const [focused, setFocused] = useState(false)
  
  
  return (
      <div className={focused ? `fe-element focused ${className}` : `fe-element ${className}`} onFocus={e => setFocused(true)} onBlur={e => setFocused(false)}>
          <label htmlFor={name}>{label}</label>
          <select className='select' name={name} value={value} onChange={onChange} required={required}>
            <option value="default" disabled>Choose an option</option>
            {options && options.map((item, index) => <option key={index} value={item._id || index }>{item.name || item}</option>)}
        </select>
      </div>
    
  )
}

export default Select
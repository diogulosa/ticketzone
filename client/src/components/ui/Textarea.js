import React, { useState } from 'react'
import './Textarea.css'

const STATUS = {
  FOCUSED: 'focused',
  NORMAL: ''
}

function Textarea({name, label, required, onChange, value, style}) {

  const [focused, setFocused] = useState(STATUS.NORMAL)

  return (
      <div className={focused === STATUS.FOCUSED? 'fe-element focused' : 'fe-element'} onFocus={e => setFocused(STATUS.FOCUSED)} onBlur={e => setFocused(STATUS.NORMAL)}>
          <label htmlFor={name}>{label}</label>
          <textarea style={style} className='textarea' required={required} onChange={onChange} value={value}></textarea>
      </div>
    
  )
}

export default Textarea
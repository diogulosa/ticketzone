import React from 'react'

function Content({children, className, style}) {

  return (
    <div style={style} className={`site-content ${className ? className : null}`}>{children}</div>
  )
}

export default Content
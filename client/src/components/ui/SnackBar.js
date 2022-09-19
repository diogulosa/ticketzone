import React from 'react'

import './SnackBar.css'

function SnackBar(props) {

  return (
    <div className={props.className ? 'snackbar ' + props.className : 'snackbar'}>{props.text} <span className='material-icons' onClick={props.onClick}>close</span></div>
  )
}

export default SnackBar
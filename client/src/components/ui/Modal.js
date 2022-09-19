import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

function Modal({title, children, onClose, date, footer}) {
    // if(!show){
    //     return null
    // }

  return ReactDOM.createPortal(
    <div className='overlay'>
        <div className='modal'>
            <div className='modal-header'>
                <div className='modal-title'>
                    <h3>{title}</h3> <span className='material-icons' onClick={onClose}>close</span>
                </div>
                {date && <p>{date}</p>}
            </div>
            <div className='modal-content'>{children}</div>
            <div className='modal-footer'>{footer}</div>
        </div>
    </div> 
    ,document.getElementById('modal'))
}

export default Modal
import React from 'react'
import './AdminPanel.css'

function AdminPanel({children, id, label, isOpen, onClick}) {

    return (
        <div className='sub-menu-container'>
            <span className='sub-menu-header' target={id} onClick={onClick}>{label} <span className='material-icons' target={id} onClick={onClick}>expand_{isOpen === true ? 'less' :  'more'}</span></span>
        <ul style={isOpen === true? {display: 'block'} : {display: 'none'}} className='sub-menu' id={id}>
            {children}
        </ul>
        </div>
    )
}

export default AdminPanel
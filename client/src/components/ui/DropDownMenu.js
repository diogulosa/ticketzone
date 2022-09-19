import React, { useState } from 'react'
import './DropDownMenu.css'

function DropDownMenu({header, children, element}) {

    const [menuIsVisible, setMenuIsVisible] = useState(false)

    function handleClick(){
        
            if(menuIsVisible){
                setMenuIsVisible(false)
            }else{
                setMenuIsVisible(true)
            }
    }   

  return (
    <div className='dropdown-container'>
        <div className='menu-header' onClick={handleClick}>{header} <span className='material-icons'>expand_more</span></div>
        <div className={`dropdown-menu ${menuIsVisible ? 'show': ''}`}>
            {children}
        </div>
    </div>
  )
}

export default DropDownMenu
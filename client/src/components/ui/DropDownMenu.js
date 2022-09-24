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
    
    function handleMouseLeave(e){
        setTimeout(function(){}, 3000)
        if(menuIsVisible){
            setMenuIsVisible(false)
        }
    }

    return (
        <div className='dropdown-container'>
            <div className='menu-header' onClick={handleClick}>{header} <span className='material-icons'>expand_more</span></div>
            <ul onMouseLeave={handleMouseLeave} className={`dropdown-menu ${menuIsVisible ? 'show': ''}`}>
                {children}
            </ul>
        </div>
    )
}

export default DropDownMenu
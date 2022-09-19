import React from 'react'
import './MobileAppBar.css'
import appleStore from '../../images/apple-app-store.png'
import androidStore from '../../images/android-app-store.png'

function MobileAppBar({ios, android}) {
  
  function close(){
    let el = document.getElementById('download-mobile-app')
    localStorage.setItem('denied-download-app', true)
    el.remove()
  }
  return (
    
    <div id='download-mobile-app'>
        {ios ? <><img src={appleStore} alt='Ticketzone | Download app' /><div className='app-download-button'><span className='material-icons' onClick={close}>close</span></div></> : null}
        {android ? <><img src={androidStore} alt= 'Ticketzone | Download app' /><div className='app-download-button'><span className='material-icons' onClick={close}>close</span></div></> : null} 
    </div>
  )
}

export default MobileAppBar
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AdminPanel from './AdminPanel'

import './AdminMenu.css'


function AdminMenu() {

  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [eventsMenuOpen, setEventsMenuOpen] = useState(false)
  let location = useLocation()
  
  
  useEffect(() => {
    if(location.pathname.includes('account')){
      setAccountMenuOpen(true)
    }
    if(location.pathname.includes('events') || location.pathname.includes('event')){
      setEventsMenuOpen(true)
    }
  }, [location])
  
  

  function handleAccountMenuClick(e){
    if(accountMenuOpen === true){
      setAccountMenuOpen(false)
    }else{
      setAccountMenuOpen(true)
    }
  }

  function handleEventsMenuClick(e){
    if(eventsMenuOpen === true){
      setEventsMenuOpen(false)
    }else{
      setEventsMenuOpen(true)
    }
  }

  return (
    <div className='admin-menu'>
      <AdminPanel id="account" label="Account Settings" isOpen={accountMenuOpen} onClick={handleAccountMenuClick}>
          <li><Link className={location.pathname.includes('contact-info') ? 'active' : ''} to="account/contact-info" onClick={handleAccountMenuClick}>Contact info</Link></li>
          <li><Link to="account/password">Password</Link></li>
          <li><Link to="">Log out</Link></li>
          <li><Link to="account/close-account">Close account</Link></li>
      </AdminPanel>

      <AdminPanel id="events" label="Manage events" isOpen={eventsMenuOpen} onClick={handleEventsMenuClick}>
        <li><Link className={location.pathname.includes('my-events') || location.pathname.includes('event') ? 'active' : ''} to="my-events">Events</Link></li>
        <li><Link to="">Orders</Link></li>
        <li><Link to="">Reports</Link></li>
        <li><Link to="organization-info">Organization info</Link></li>
      </AdminPanel>
    </div>
  )
}

export default AdminMenu
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'


import './EditEvent.css'

function EditEvent() {

  let location = useLocation()
  let navigate = useNavigate()
  const params = useParams()
  let l = location.pathname.substring(location.pathname.lastIndexOf('/') + 1) //último segmento do url
  const [activeLink, setActiveLink] = useState('basic-info')

  useEffect(() => {
    if(l === 'edit') return navigate('basic-info', {eventId: params.id})
  }, [navigate, l, params.id])
  

  return (
    <div className='edit-event-container'>
        <aside className='edit-event-menu'>
            <ul>
                <li><Link className={activeLink === 'basic-info' ? 'active' : null} to="basic-info" onClick={e => setActiveLink('basic-info')}>Basic info</Link></li>
                <li><Link onClick={()=> {navigate('location', {id: params.id}); setActiveLink('location')}} className={activeLink === 'location' ? 'active' : null} to="location">Location</Link></li>
                <li><Link className={activeLink === 'date-and-time' ? 'active' : null} to="date-and-time" onClick={e => setActiveLink('date-and-time')}>Date and time</Link></li>
                <li><Link className={activeLink === 'tickets' ? 'active' : null} onClick={(e) => {e.preventDefault(); navigate('tickets', {id: params.id}); setActiveLink('tickets')}} to="tickets">Tickets</Link></li>
                <li><Link className={activeLink === 'details' ? 'active' : null} onClick={(e) => {e.preventDefault(); navigate('details', {id: params.id}); setActiveLink('details')}} to="details">Details</Link></li>
            </ul>
        </aside>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default EditEvent
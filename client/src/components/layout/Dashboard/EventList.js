import React, { useCallback, useEffect, useState } from 'react'
import { useAuthState } from '../../../store/auth'
import AdminContent from './AdminContent'

import './EventList.css'
import EventListItem from './EventListItem'

function EventList() {

    const [events, setEvents] = useState()
    const {userData} = useAuthState()
    
    const getEventsByUser = useCallback(
      async (id) => {
        let res = await fetch('/events/user/' + id)
        let data = await res.json()
        if(data.success){
            setEvents(data.events)
        }
      }, []
    )
    
    
    useEffect(() =>{
        getEventsByUser(userData.id)
    }, [getEventsByUser, userData.id])


  return (
    <AdminContent>
        <div className='events-list-container inner'>
        <h1>My events</h1>
            <div className='events-list-header'>
                <ul>
                    <li className='item-title'>Title</li>
                    <li className='item-date'>Date</li>
                    <li className='item-status'>Status</li>
                    <li style={{visibility: 'hidden'}}>more</li>
                </ul>
            </div>
            {events && events.map(item => <EventListItem key={item._id} id={item._id} title={item.title} date={item.dateStart} status={item.status} />
            )}
        </div>
    </AdminContent>
  )
}

export default EventList
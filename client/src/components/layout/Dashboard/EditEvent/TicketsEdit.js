import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../../ui/Input'
import LoadingSpinner from '../../../ui/LoadingSpinner'
import { arrayBufferToBase64 } from '../../../../utils'


function TicketsEdit() {
    const params = useParams()
    const [event, setEvent] = useState()

    useEffect(() => {
      async function fetchDataById(route, id, next) {
        try {
          let response = await fetch(`/${route}/${id}`);
          let data = await response.json();
          if (data.success) {
            if(route === 'events'){
              const {image} = data.event
              var base64Flag = `data:${image.contentType};base64,`;
              var imgStr = arrayBufferToBase64(image.data.data)
              data.event.image = base64Flag + imgStr
              next(data.event)
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchDataById('events', params.id, setEvent)
    }, [])

    function updateTickets(e){
        e.preventDefault()
        console.log('cenas');
    }
    
  return (
    <>
    <h1>Tickets</h1>
    {event ? <>
        <Input type="text" label="Ticket Name" value={event.ticketName}/>
        <Input type="number" label="Ticket Price" value={event.ticketPrice}/>
        <Input type="number" label="Tickets Available" value={event.ticketsAvailable} />
    </> : <LoadingSpinner />}
    <button className='btn mt-10' type='submit' onClick={updateTickets}>Save</button>
    </>
  )
}

export default TicketsEdit
import React, { useEffect, useState } from 'react'
import Page from '../components/layout/Page'
import SingleEvent from '../components/Events/SingleEvent'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { arrayBufferToBase64 } from '../utils'

function EventDetails() {

  const [event, setEvent] = useState()
  let {id} = useParams()

  async function getEventById(id){
    let res = await fetch('/events/' + id)
    let data =  await res.json()
    let {image} = data.event
    var base64Flag = `data:${image.contentType};base64,`;
    var imgStr = arrayBufferToBase64(image.data.data)
    data.event.image = base64Flag + imgStr
    setEvent(data.event)
  }

  useEffect(() => {
    getEventById(id)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
  }, [])
  

  return (
    <>
    <Page className="bg-black" footer={true} >
      {event ? <SingleEvent id={id} image={event.image} ticketName={event.ticketName} venue={event.venue} address={event.address} title={event.title} date={new Date(event.dateStart).toDateString()} time={event.timeStart} location={`${event.city}, ${event.country}`} price={event.ticketPrice} description={event.description} organizer={event.organizer} tags={event.tags} /> : <LoadingSpinner/>}
    </Page>
    </>
  )
}

export default EventDetails
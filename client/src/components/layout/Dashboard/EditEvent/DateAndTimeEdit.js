import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../../ui/Input'
import LoadingSpinner from '../../../ui/LoadingSpinner'
import moment from 'moment'
import { useAuthState } from '../../../../store/auth'
import { arrayBufferToBase64 } from '../../../../utils'


function DateAndTimeEdit() {

  const [event, setEvent] = useState()
  const params = useParams()
  const {userData} = useAuthState()
  const [message, setMessage] = useState()

  function formatDates(){
    return 
  }

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

  useEffect(() =>{
    
  },[])
    
  async function updateDateAndTime(e){
    e.preventDefault()
    console.log(event.dateStart);
    const payload = {dateStart: event.dateStart, dateEnd: event.dateEnd, timeStart: event.timeStart, timeEnd: event.timeStart}
    let res = await fetch('/events/date-and-time/' + params.id, {method: 'POST', body: JSON.stringify(payload), headers: {'x-access-token': userData.auth_token, 'Content-type': 'application/json'}})
    let data = await res.json()
    if(data.success){
      setMessage(data.message)
    }
  }
  return (
    <>
    <h1>Date and time</h1>
    {message ? <p className='success'>{message}</p> : null}
    {event ? <>
    <Input type="date" label="Event start date" value={moment(event.dateStart).format('yyyy-MM-DD')} onChange={(e) => setEvent({...event, dateStart: Date.parse(e.target.value)})}/>
    <Input type="date" label="Event end date" value={moment(event.dateEnd).format('yyyy-MM-DD')} onChange={(e) => setEvent({...event, dateEnd: Date.parse(e.target.value)})}/>
    <Input type="time" label="Event start time" value={event.timeStart} onChange={(e) => setEvent({...event, timeStart: e.target.value})}/>
    <Input type="time" label="Event end time" value={event.timeEnd} onChange={(e) => setEvent({...event, timeEnd: e.target.value})}/></> : <LoadingSpinner />}
    
    <button className='btn mt-10' type='submit' onClick={updateDateAndTime}>Save</button>
    </>
  )
}

export default DateAndTimeEdit
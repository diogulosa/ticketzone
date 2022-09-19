import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthState } from '../../../../store/auth'
import Input from '../../../ui/Input'
import LoadingSpinner from '../../../ui/LoadingSpinner'
import Select from '../../../ui/Select'
import { arrayBufferToBase64 } from '../../../../utils'


function LocationEdit() {
  const [countries, setCountries] = useState()
  const [message, setMessage] = useState()
  const [event, setEvent] = useState()
  const params = useParams()
  const {userData} = useAuthState()

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
    async function fetchData(route, next) {
      try {
        let response = await fetch(`/${route}/`);
        let data = await response.json();
        if (data.success) {
          if(route === 'countries') next(data.countries)
          if(route === 'events') next(data.events)
          if(route === 'categories') next(data.categories)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchDataById('events', params.id, setEvent)
    fetchData('countries', setCountries)
    }, [])

    async function updateLocation(e){
      e.preventDefault()
      const payload = {venue: event.venue, address: event.address, zipCode: event.zipCode, city: event.city, country: event.country}
      let res = await fetch('/events/location/' + params.id, {method: 'POST', body: JSON.stringify(payload), headers: {'x-access-token': userData.auth_token, 'Content-type': 'application/json'}})
      let data = await res.json()
      if(data.success){
        setMessage(data.message)
      }
    }
  

  return (
    <>
      <h1>Location</h1>
      {message ? <p className='success'>{message}</p> : null}
      {event ? <><Input type="text" label="Venue" value={event.venue} onChange={e => setEvent({...event, venue: e.target.value})}/>
      <Input type="text" label="Address" value={event.address} onChange={e => setEvent({...event, address: e.target.value})}/>
      <Input type="text" label="Zip Code" value={event.zipCode} onChange={e => setEvent({...event, zipCode: e.target.value})}/>
      <Input type="text" label="City" value={event.city} onChange={e => setEvent({...event, city: e.target.value})}/>
      <Select options={countries && countries} label="Country" value={event.country._id} onChange={e => setEvent({...event, country: e.target.value})}/></> : <LoadingSpinner />}
      <button className='btn mt-10' type='submit' onClick={updateLocation}>Save</button>
    </>
    
  )
}

export default LocationEdit
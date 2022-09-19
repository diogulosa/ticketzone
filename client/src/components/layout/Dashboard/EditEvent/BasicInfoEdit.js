import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../../ui/Input'
import Select from '../../../ui/Select'
import LoadingSpinner from '../../../ui/LoadingSpinner'
import { useAuthState } from '../../../../store/auth'
import { arrayBufferToBase64 } from '../../../../utils'

function BasicInfoEdit() {

  const {userData} = useAuthState()
  const [event, setEvent] = useState()
  
  const [categories, setCategories] = useState()
  const [tag, setTag] = useState()
  const [message, setMessage] = useState()
  const params = useParams()

    

    const getCategories = useCallback(
      async () =>{
        let res = await fetch('/categories')
        let data = await res.json()
        if(data.success){
            setCategories(data.categories)
        }
      },[setCategories]
    )

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
      getCategories()
    }, [])

  

    async function updateBasicInfo(e){
      e.preventDefault()
      const payload = {title: event.title, organizer: event.organizer, category: event.category, tags: event.tags}
      console.log(payload)
      let res = await fetch('/events/basic-info/' + params.id, {method: 'POST', body: JSON.stringify(payload), headers: {'x-access-token': userData.auth_token, 'Content-type': 'application/json'}})
      let data = await res.json()
      if(data.success){
        setMessage(data.message)
      }
    }

    function addTag(e){
      if((e.key === ',' || e.key === "Enter") && e.target.value !== ''){
          e.preventDefault()
          let arr = event.tags
          arr.push(tag)
          setEvent({...event, tags: arr})
          setTag('')
      }  
  }

    function removeTag(e){
      const tagValue = e.target.parentElement.innerHTML.split(' ')[0]
      const {tags} = event
      const arr = tags.filter(item => item !== tagValue)
      setEvent({...event, tags: arr})
    }
  
    return (
      <>
      <h1>Basic Info</h1>
      {message ? <p className='success'>{message}</p> : null}
      {event ? <><Input type="text" label="Event title" name="title" value={event.title} onChange={e => setEvent({...event, title: e.target.value})} /><Input type="text" label="Organizer" name="organizer" value={event.organizer} onChange={e => setEvent({...event, organizer: e.target.value})} />
      <Select options={categories} label="Category" name="category" value={event.category} onChange={e => setEvent({...event, category: e.target.value})}/>
      <Input type="text" label="Tags" name="tags" value={tag} onKeyDown={addTag} onChange={e => setTag(e.target.value)}/>
      <ul className='tag-pills'>
        {event.tags.map((item, index) => <li key={index}>{item} <span className='material-icons' onClick={removeTag}>close</span></li>)}
      </ul></> : <LoadingSpinner/>}
      
      <button className='btn mt-10' type='submit' onClick={updateBasicInfo}>Save</button>
      </>
      )
      
}


export default BasicInfoEdit
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthState } from '../../../../store/auth'
import { arrayBufferToBase64 } from '../../../../utils'
import FileUpload from '../../../ui/FileUpload'
import Input from '../../../ui/Input'
import LoadingSpinner from '../../../ui/LoadingSpinner'
import Textarea from '../../../ui/Textarea'

function DetailsEdit() {
    const {userData} = useAuthState()
    const params = useParams()

    const [event, setEvent] = useState()

    const [hasError, setHasError] = useState(false)
    const [message, setMessage] = useState()
    const [details, setDetails] = useState({})
    const [src, setSrc] = useState(null)

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
              setSrc(data.event.image)
              next(data.event)
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchDataById('events', params.id, setEvent)
    }, [])

    function handleDrop(e){
      e.preventDefault()
      e.stopPropagation()
      let file = e.dataTransfer.files[0];
      let fileSize = file.size / 1024 /1024
      if(file){
        if(fileSize < 2 && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')){
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
              setSrc(fileReader.result.toString())
          }, false)
          fileReader.readAsDataURL(file)
          setHasError(false)
        }else{
          setHasError(true)
          setMessage('Images must be no bigger then 2MB. Accepted file types: .jpeg, .jpg or .png')
        }
    }
    }

    function handleInputFileClick(e){
      e.preventDefault()
      e.stopPropagation()
      document.getElementById('inputfile').click()
    }

    function handleInputChange(e){
      let file = document.getElementById("inputfile").files[0];
      let fileSize = file.size / 1024 /1024
      if(file){
        if(fileSize < 2 && (file.type === 'image/jpeg' || file.type === 'image/png')){
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
              setSrc(fileReader.result.toString())
          }, false)
          fileReader.readAsDataURL(file)
          setHasError(false)
        }else{
          setHasError(true)
          setMessage('Images must be no bigger then 2MB. Accepted file types: .jpeg, .jpg or .png')
        }
      }
    }

    async function updateDetails(e){
      e.preventDefault()
      if(details){
        const payload = new FormData()
        Object.entries(details).forEach(e => {
            payload.append(e[0], e[1])
        })
        let res = await fetch('/events/details/' + params.id, {method: 'POST', body: payload, headers: {'x-access-token': userData.auth_token}})
        let data = await res.json()
        if(data.success){
          setMessage( data.message)
        }
      } 
    }
    
  return (
    <>
    <h1>Event Details</h1>
    {message ? <p className={hasError ? 'error' : 'success'}>{message}</p> : null}
    {event ? <>
        <FileUpload handleDrop={handleDrop} handleInputFileClick={handleInputFileClick} handleInputChange={handleInputChange}>
        {src && <img src={src} alt="upload file"/>}
        </FileUpload>
        <Textarea label="Description" value={details.description || event.description} onChange={e => setDetails({...details, description: e.target.value})}/>
        <Input type="url" label="Event URL" value={event.eventURL} onChange={e => setDetails({...details, eventURL: e.target.value})}/>
     </> : <LoadingSpinner />}
     <button className='btn mt-10' type='submit' onClick={updateDetails}>Save</button>
    </>
  )
}

export default DetailsEdit
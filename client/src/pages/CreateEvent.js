import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from '../store/auth'

import BasicInfo from './CreateEvent/BasicInfo'
import DateAndTime from './CreateEvent/DateAndTime'
import Location from './CreateEvent/Location'
import Tickets from './CreateEvent/Tickets'
import FormNav from './CreateEvent/FormNav'
import Details from './CreateEvent/Details'
import Visibility from './CreateEvent/Visibility'


import './CreateEvent.css'
import SnackBar from '../components/ui/SnackBar'
import Page from '../components/layout/Page'

function CreateEvent() {

    let {userData} = useAuthState()
    const navigate = useNavigate()

    const [address, setAddress] = useState({line1: '', line2: '', complete: ''})
    const [step, setStep] = useState(1)
    const [errorMsg, setErrorMsg] = useState('')
    const [src, setSrc] = useState()
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true)

    
    const [formData, setFormData] = useState({
        title: '',
        organizer: '',
        category: '',
        venue: '', 
        address: '', 
        zipCode: '', 
        city: '', 
        country: '',
        startDate: '',
        endDate:'',
        startTime: '',
        endTime: '',
        ticketName: '',
        ticketPrice: '',
        ticketQty: '',
        absorbFees: true,
        description: '',
        tags: [],
        image: null,
        createdBy: userData.id,
        status: '',
        privacy: false,
        privacySettings: null,
        eventURL: ''
    })

    const disableNext = useCallback(
        () => {
          switch (step) {
            case 1:
                if(formData.title !== '' && formData.organizer !== '' && formData.category !== ''){
                    setNextButtonDisabled(false)
                }else{
                    setNextButtonDisabled(true)
                }               
                break
            case 2:
                (formData.address !== '' && formData.zipCode !== '' && formData.city !== '' && formData.country !== '') ? setNextButtonDisabled(false) : setNextButtonDisabled(true)
                break
            case 3:
                (formData.startDate !== '' && formData.endDate !== '' && formData.startTime !== '') ? setNextButtonDisabled(false) : setNextButtonDisabled(true)
                break
            case 4:
                (formData.ticketName !== '' && formData.ticketPrice !== '' && formData.ticketQty !== '') ? setNextButtonDisabled(false) : setNextButtonDisabled(true)
                break
            case 5:
                (formData.image && formData.description !== '') ? setNextButtonDisabled(false) : setNextButtonDisabled(true)
                break
              default:
                  return setNextButtonDisabled(true);
          }
        },
        [formData, step],
      )

    async function handleSubmit(e){
        e.preventDefault()
        setFormData({...formData, status: e.target.id, createdBy: userData.id})
        if(formData.status !== ''){
            console.log(formData);
            const payload = new FormData()
            Object.entries(formData).forEach(e => {
                payload.append(e[0], e[1])
            })
            const requestOptions = {method: 'POST', body: payload}
            const res = await fetch('/events/create', requestOptions)
            const data = await res.json()
            if(data.success){
                navigate('/')
            }
        }
        
    }

    const [tag, setTag] = useState('')

    function addTag(e){
        if((e.key === ',' || e.key === "Enter") && e.target.value !== ''){
            e.preventDefault()
            let arr = formData.tags
            arr.push(e.target.value)
            setFormData({...formData, tags: arr})
            setTag('')
        }  
    }

    function handleTagChange(e){
        setTag(e.target.value)
    }

    function removeTag(e){
        const v = e.target.parentElement.querySelector('.text').innerText
        let arr = formData.tags.filter(value => value !== v)
        setFormData({...formData, tags: arr})
    }

    function stepBack(e){
        e.preventDefault()
        if(step > 1) setStep(step-1)
    }

    function stepForward(e){
        e.preventDefault()
        if(step < 5) setStep(step +1)
    }

    useEffect(() => {
        disableNext()
      if(!userData.auth_token) navigate('/log-in')
    }, [navigate, userData, disableNext])

    function handleFormChange(){
        setErrorMsg('')
    }

    function handleImageDrop(e){
        e.preventDefault()
        e.stopPropagation()
        //let _URL = window.URL || window.webkitURL
        let file = e.dataTransfer.files[0];
        let fileSize = file.size / 1024 /1024
        if(file){
          if(fileSize < 2 && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')){
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                setSrc(fileReader.result.toString())
            }, false)
            fileReader.readAsDataURL(file)
            setErrorMsg(false)
          }else{
            setErrorMsg('Images must be no bigger then 2MB. Accepted file types: .jpeg, .jpg or .png')
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
        if(fileSize < 1 && (file.type === 'image/jpeg' || file.type === 'image/png')){
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                setSrc(fileReader.result.toString())
            }, false)
            fileReader.readAsDataURL(file)
            setErrorMsg(false)
            
        }else{
        setErrorMsg('Images must be no bigger then 2MB. Accepted file types: .jpeg, .jpg or .png')
        }
    }
    }






    return (
        <Page className="centered" headerSimple>
            
            <form onChange={handleFormChange} id="create-event-form" name='form' className='event-form' onSubmit={handleSubmit} encType="multipart/form-data">
                {errorMsg && <SnackBar className="error" text={errorMsg} onClick={e => setErrorMsg('')}/>}

                {step === 1 && <BasicInfo 
                    onChangeTitle={e => setFormData({...formData, title: e.target.value})}
                    titleValue={formData.title}
                    onChangeOrganizer={e => setFormData({...formData, organizer: e.target.value})}
                    organizerValue={formData.organizer}
                    onChangeCategory={e => setFormData({...formData, category: e.target.value})}
                    categoryValue={formData.category}
                    tagInputValue={tag}
                    addTag={addTag}
                    removeTag={removeTag}
                    handleTagChange={handleTagChange}
                    tagList={formData.tags}
                    complete={formData.title && formData.organizer}
                />}


                {/* LOCATION */}
                {step === 2 && <Location 
                    onChangeVenue={e => setFormData({...formData, venue: e.target.value})}
                    venue={formData.venue}
                    address1={address.line1}
                    onChangeAddress1={e => {
                        setAddress({...address, line1: e.target.value})
                        if(address.line2 === ''){
                            setFormData({...formData, address: e.target.value})
                        }
                        
                    }}
                    onChangeAddress2={e =>{
                        if(address.line1 !== ''){
                            setFormData({...formData, address: address.line1 + ', ' + e.target.value})
                        }
                        
                    }}
                    onChangeZipCode={e => setFormData({...formData, zipCode: e.target.value})}
                    zipCode={formData.zipCode}
                    onChangeCity={e => setFormData({...formData, city: e.target.value})}
                    city={formData.city}
                    onChangeCountry={e => setFormData({...formData, country: e.target.value})}
                    countryValue={formData.country}
                />}

                {/* DATE AND TIME */}
                {step === 3 && <DateAndTime 
                    startDate={formData.startDate} 
                    onChangeStartDate={e => setFormData({...formData, startDate: e.target.value, endDate: e.target.value})}
                    endDate={formData.endDate}
                    onChangeEndDate={e => setFormData({...formData, endDate: e.target.value})}
                    startTime={formData.startTime}
                    onChangeStartTime={e => setFormData({...formData, startTime: e.target.value})}
                    endTime={formData.endTime}
                    onChangeEndTime={e => setFormData({...formData, endTime: e.target.value})}
                />}

                {/* TICKETS */}
                {step === 4 && <Tickets 
                    ticketName={formData.ticketName}
                    onChangeTicketName={e => setFormData({...formData, ticketName: e.target.value})}
                    ticketPrice={formData.ticketPrice}
                    onChangeTicketPrice={e => setFormData({...formData, ticketPrice: e.target.value})}
                    ticketQty={formData.ticketQty}
                    onChangeTicketQty={e => setFormData({...formData, ticketQty: e.target.value})}
                    feeHandling={formData.absorbFees}
                    setFeeHandling={e => e.target.value === '0' ? setFormData({...formData, absorbFees: true}) :  setFormData({...formData, absorbFees: false})}
                />}

                {/* DETAILS */}
                {step === 5 && <Details handleImageDrop={handleImageDrop} handleInputFileClick={handleInputFileClick} handleInputChange={handleInputChange} message={errorMsg? errorMsg : null} onChangeDescription={ e => setFormData({...formData, description: e.target.value})} descValue={formData.description} onChangeURL={e => setFormData({...formData, eventURL: e.target.value})} valueURL={formData.eventURL} >
                    {src && <img src={src} alt="upload file"/>}
                </Details>}

                {/* EVENT VISIBILITY */}
                {step === 5 && <Visibility 
                    setToPublic={e => setFormData({...formData, privacy: false})} 
                    setToPrivate={e => setFormData({...formData, privacy: true})} 
                    setPrivacySettings={e => setFormData({...formData, privacySettings: e.target.value})} 
                    privacySettings={formData.privacy}/>
                }
            </form>
            <FormNav 
                onClickPrev={stepBack}  
                onClickNext={stepForward} 
                onClickSave={handleSubmit} 
                onClickPublish={handleSubmit} 
                step={step} 
                disableNext={nextButtonDisabled}/>
        </Page> 
    )
           
}

export default CreateEvent
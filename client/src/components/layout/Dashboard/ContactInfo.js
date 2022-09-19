import React, { useState } from 'react'
import { useAuthState } from '../../../store/auth'
import { updateUserName } from '../../../utils/users'
import Button from '../../ui/Button'
import FileUpload from '../../ui/FileUpload'
import Input from '../../ui/Input'
import Select from '../../ui/Select'

import './ContactInfo.css'

function ContactInfo() {

    const user = useAuthState().userData
    const [userData, setUserData] = useState({
        id: '',
        newEmail: '',
        password: '',
        fname: '',
        lname: ''
    })
    
    function setNewEmail(e){
        let el = document.getElementById('new-email')
        el.style.display = 'block'
        e.target.setAttribute('disabled', true)
    }


    function submitForm(e){
        e.preventDefault()
        if(userData.fname !== '' && userData.lname !== ''){
            updateUserName(user.id, userData.fname, userData.lname)
        }
    }
    

    return (
            <div className='inner' id="contact-info">
                <section className='section'>
                    <h1>Account email address</h1>
                    <p>{user.email}</p>
                    <Button className="mb-20" onClick={setNewEmail}>Change email</Button>
                    <div id="new-email" style={{display: 'none'}}>
                        <Input type="email" label="New email address" onChange={e => setUserData({...userData, newEmail: e.target.value})} value={userData.newEmail} required/>
                        <Input type="password" label="Current password" onChange={e => setUserData({...userData, password: e.target.value})} value={userData.password} />
                        <Button>Save</Button>
                    </div>
                </section>

                <section className='section'>
                    <FileUpload formHeading="Profile picture" />
                </section>

                <section className='section'>
                    <h1>Contact information</h1>
                    <div className='flex-container'>
                        <Input type="text" className="half-w" label="First Name" name="fname" value={userData.fname} onChange={e => setUserData({...userData, fname: e.target.value})}/>
                        <Input type="text" className="half-w" label="Last Name" name="lname" value={userData.lname} onChange={e => setUserData({...userData, lname: e.target.value})}/>
                    </div>
                    <div className='flex-container'>
                        <Input type="number" className="half-w" label="Home phone" name="homephone" />
                        <Input type="number" className="half-w" label="Cell phone" name="cellphone" />
                    </div>
                    <div className='flex-container'>
                        <Input type="text" className="half-w" label="Job title" name="jobtitle" />
                        <Input type="text" className="half-w" label="Company" name="company" />
                    </div>
                    <div className='flex-container'>
                        <Input type="url" className="half-w" label="Website" name="website" />
                        <Input type="url" className="half-w" label="Blog" name="blog" />
                    </div>
                </section>
                <section className='section'>
                    <h1>Home Address</h1>
                        <Input type="text" label="Address 1" name="address1" />
                        <Input type="text" label="Address 2" name="address2" />
                    <div className='flex-container'>
                        <Input type="text" className="half-w" label="City" name="city" />
                        <Select label="Country" className="half-w" options={[]}/>
                    </div>
                    <div className='flex-container'>
                        <Input type="text" className="half-w" label="Zip code" name="zipcode" />
                        <Input type="hidden" containerStyle={{border: 'none'}} className="half-w" />
                    </div>
                    
                </section>
                <section className='section'>
                    <h1>Billing Address</h1>
                        <Input type="text" label="Address 1" name="address1" />
                        <Input type="text" label="Address 2" name="address2" />
                    <div className='flex-container'>
                        <Input type="text" className="half-w" label="City" name="city" />
                        <Select label="Country" className="half-w" options={[]}/>
                    </div>
                    <div className='flex-container'>
                        <Input type="text" className="half-w" label="Zip code" name="zipcode" />
                        <Input type="hidden" containerStyle={{border: 'none'}} className="half-w" />
                    </div>
                    
                </section>
                <section className='section'>
                    <h1>Shipping Address</h1>
                        <Input type="text" label="Address 1" name="address1" />
                        <Input type="text" label="Address 2" name="address2" />
                    <div className='flex-container'>
                        <Input type="text" className="half-w" label="City" name="city" />
                        <Select label="Country" className="half-w" options={[]}/>
                    </div>
                    <div className='flex-container'>
                        <Input type="text" className="half-w" label="Zip code" name="zipcode" />
                        <Input type="hidden" containerStyle={{border: 'none'}} className="half-w" />
                    </div>
                    
                </section>
                <Button onClick={submitForm}>Save</Button>
            </div>
        
    )
}

export default ContactInfo
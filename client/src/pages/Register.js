import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Page from '../components/layout/Page'
import Input from '../components/ui/Input'
import validator from 'validator'


function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password:'',
        passConfirm: '',
    })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [emailClass, setEmailClass] = useState('')
    const [passClass, setPassClass] = useState('')
    const [passConfirmClass, setConfirmPassClass] = useState('')

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: formData.email, password: formData.password}),
      };

    async function handleSubmit(e){
        e.preventDefault()
        const email = {formData}
        if(email.length !== 0){
            if(formData.password !== formData.passConfirm){
                setError('Passwords must match.')
            }else{
                setError('')
                const response = await fetch('/users/create', requestOptions)
                const data = await response.json()
                if(data.success){
                    setMessage('To complete your account registration, please check your inbox')
                }else{
                    setError(data.message)
                }
            }
        }else{
            setError('Please provide a valid email.')
        } 
    }

    function onEmailInputChange(e){
        setFormData({...formData, email: e.target.value})
        if(!validator.isEmail(e.target.value)){
            setError('Please provide a valid email address.')
            setEmailClass('required')
        }else{
            setError('')
            setEmailClass('focused')
        }
    }

    function onPassChange(e){
        setFormData({...formData, password: e.target.value})
        if(!validator.isStrongPassword(e.target.value, {minLength: 5, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0})){
            setError('Valid passwords must be at least 5 characters long.')
            setPassClass('required')
        }else{
            setError('')
            setPassClass('focused')
        }
    }

    function onPassConfirmChange(e){
        setFormData({...formData, passConfirm: e.target.value})
        if(e.target.value !== formData.password){
            setError('Passwords must match.')
            setConfirmPassClass('required')
        }else{
            setError('')
            setConfirmPassClass('focused')
        }
    }

  return (
    <Page className="centered" >
        <form onSubmit={handleSubmit} className="auth-form">
            <h1>Create account.</h1>
            <p className={error && 'error'}>{error}</p>
            <p className={message && 'message'}>{message}</p>
            <Input className={emailClass && emailClass} type="email" label="Email" name="email" value={formData.email} onChange={onEmailInputChange} required/>
            <Input className={passClass && passClass} type="password" label="Password" name="password" value={formData.password} onChange={onPassChange} required />
            <Input className={passConfirmClass && passConfirmClass} type="password" label="Confirm password" name="passConfirm" value={formData.passConfirm} onChange={onPassConfirmChange} required />
            <button type='submit' className='btn full-w' onClick={handleSubmit}>Register</button>
            <br/>
            <p>Already have an account? <Link to="/log-in">Log in</Link></p>
        </form>
    </Page>
  )
}

export default Register
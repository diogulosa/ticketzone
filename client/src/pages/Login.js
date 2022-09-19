import React, { useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Page from '../components/layout/Page'
import Input from '../components/ui/Input'
import { loginUser, useAuthDispatch, useAuthState } from '../store/auth'
import validator from 'validator'

function Login(props) {

  const {userData} = useAuthState()
  const dispatch = useAuthDispatch()
  const location = useLocation()
  let navigate = useNavigate()
  const [formData, setFormData] = useState({email: '', password: ''})
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [emailClass, setEmailClass] = useState('')
  const [passClass, setPassClass] = useState('')
    
  async function handleSubmit(e){
      e.preventDefault()
      try {
        const data = await loginUser(dispatch, formData)
        if(!data.success){ 
          setError(data.message) 
        }else{
          if(document.referrer){
            navigate(-1)
          }else{
            navigate('/', {replace: false})
          }
        }
      } catch (err) {
        console.log(err)
      }
  }

  function handleEmailChange(e){
    e.preventDefault()
    setFormData({...formData, email: e.target.value})
    if(validator.isEmail(e.target.value)){
        setEmailClass('focused')
        setError('')
    }else{
        setEmailClass('required')
        setError('Please provide a valid email')
    }
  }

  function handlePassChange(e){
    e.preventDefault()
    setFormData({...formData, password: e.target.value})
    if(validator.isStrongPassword(e.target.value, {minLength: 5, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0})){
      setPassClass('focused')
      setError('')
    }else{
      setPassClass('required')
      setError('Password must be at least 5 characters long')
    }
  }

  useEffect(() => {
    if(location.state){
      setMessage(location.state.message)
    }else{
      if(userData.loggedIn) {
        if(document.referrer) navigate(-1)
        navigate('/')
      }
    }
    
  }, [userData.loggedIn, navigate])

  async function resetPassword(e){
    let res = await fetch('/users/reset-password', {method: 'POST', body: JSON.stringify({email: formData.email}), headers: {'Content-type': 'application/json'}})
    let data = await res.json()
    if(!data.success){
      setError(data.message)
      setEmailClass('required')
    }else{
      setError(data.message)
      setEmailClass('focused')
    }
  }

  return (
    <Page className="centered">
        <form onSubmit={handleSubmit} className="auth-form">
            <h1>Log in.</h1>
            <p className={error && 'error'}>{error}</p>
            <p className={message && 'message'}>{message}</p>
            <Input className={emailClass && emailClass} type="email" label="Email" name="email" value={formData.email} onChange={handleEmailChange} />
            <Input className={passClass && passClass} type="password" label="Password" name="password" value={formData.password} onChange={handlePassChange}/>
            
            <button type='submit' className='btn full-w' onClick={handleSubmit}>Log in</button>
            <br/>
            <p>Forgot your password? <Link to="" onClick={resetPassword}>Click here</Link></p>
            <p>Don't have an account yet? <Link to="/register">Register here</Link></p>
        </form>
    </Page>
  )
}

export default Login
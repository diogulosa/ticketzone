import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../components/layout/Page'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuthDispatch, loginUser, useAuthState } from '../store/auth'
import { validateUserData } from '../store/auth/actions'

function EntryScreen() {
  const dispatch = useAuthDispatch()
  const {error, loggedIn} = useAuthState()
  const [formData, setformData] = useState({email: '', password: ''})
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if(loggedIn){
      navigate('/home')
    }
  }, [loggedIn, error])
  

  async function handleSubmit(e){
    try {
      const data = await loginUser(dispatch, formData)
      if(!data.success){ 
        setErrorMessage(data.error.value) 
      }else{
          navigate('/home', {replace: true})
      }
    } catch (err) {
      console.log(err)
    }
}
  return (
    <Page noHeader noFooter className="centered bg-black">
        <form className='auth-form' onSubmit={handleSubmit}>
            <h1 className='text-center'><span className='color-brand'>Ticketzone</span> </h1>
            {error && <p className='validation error'>{error.value || errorMessage}</p>}
            <Input hasError={error && (error.field === 'email' || error.field === 'all')} onChange={e => setformData({...formData, email: e.target.value})} type='email' label="E-mail" value={formData.email} required/>
            <Input hasError={error && (error.field === 'password' || error.field === 'all')} onChange={e => setformData({...formData, password: e.target.value})} type="password" label="Password" value={formData.password} required/>
            <Button className="full-w" type="submit" onClick={handleSubmit}>Sign in</Button>
        </form>
    </Page>
  )
}

export default EntryScreen
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../components/layout/Page'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuthDispatch, loginUser } from '../store/auth'

function EntryScreen() {
  const dispatch = useAuthDispatch()
  const [formData, setformData] = useState({email: '', password: ''})
  const navigate = useNavigate()
  const [error, setError] = useState()


  async function handleSubmit(e){
    try {
      const data = await loginUser(dispatch, formData)
      if(!data.success){ 
        setError(data.message) 
      }else{
          navigate('/home')
      }
    } catch (err) {
      console.log(err)
    }
}
  return (
    <Page noHeader noFooter className="centered bg-black">
        <form className='auth-form' onSubmit={handleSubmit}>
            <h1 className='text-center'><span className='color-brand'>Ticketzone</span> </h1>
            {error && <p className='validation error'>{error}</p>}
            <Input onChange={e => setformData({...formData, email: e.target.value})} type='email' label="E-mail" value={formData.email} />
            <Input onChange={e => setformData({...formData, password: e.target.value})} type="password" label="Password" value={formData.password}/>
            <Button className="full-w" type="submit" onClick={handleSubmit}>Sign in</Button>
        </form>
    </Page>
  )
}

export default EntryScreen
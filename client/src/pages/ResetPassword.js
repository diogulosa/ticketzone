import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import validator from 'validator';
import Page from '../components/layout/Page'
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

function ResetPassword() {

    const [email, setEmail] = useState()
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const params = useParams()

    async function handleSubmit(e){
        e.preventDefault();
        let res = await fetch('/users/update-pass', {method: 'POST', body: JSON.stringify({id: params.id, pass: pass}), headers: {'Content-type': 'application/json'}})
        let data = await res.json()
        if(data.success){
            navigate('/log-in', {state: {message: 'Your password has been succesfully updated!'}})
        }
    }

    useEffect(()=>{
        async function getUserEmail(id){
            let res = await fetch('/users/' + params.id)
            let data = await res.json()
            if(data.success){
                setEmail(data.userData.email)
            }else{
                setError(data.message)
            }
        }
        if(!params.id){
            navigate('/log-in')
        }else{
            getUserEmail(params.id)
        }
    },[params.id])

    function handlePassChange(e){
        setPass(e.target.value)
        if(validator.isStrongPassword(e.target.value, {minLength: 5, minUppercase:0, minLowercase: 0, minNumbers: 0, minSymbols: 0})){
            setError('')
        }else{
            setError('Password must be at least 5 characters long')
        }
    }

    return (
        <Page className="centered">
            <form onSubmit={handleSubmit} className="auth-form">
            <h1>Reset password.</h1>
                {error && <p className='error'>{error}</p>}
                <Input type="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} disabled={true} />
                <Input type="password" label="New password" value={pass} onChange={handlePassChange} />
                <Button className="full-w" onClick={handleSubmit}>Confirm new password</Button>
            </form>
        </Page>
    )
}

export default ResetPassword
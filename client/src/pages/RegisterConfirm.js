import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'

function RegisterConfirm() {

    const params = useParams()
    const {userId} = params
    const navigate = useNavigate()
    const [message, setMessage] = useState('Waiting for account activation..')

    useEffect(()=>{
        function first(){
            setTimeout(function(){
                setMessage('Just a moment..')
                second()
                third()
            }, 5000)
            
        }
        function second(){
            setMessage('Just a moment...')
        }
        function third(){
            navigate('/log-in')
        }

        async function confirmRegistration(){
            let res = await fetch('/users/create/' + userId, {method: 'POST'})
            let data = await res.json()
            if(data.success){
                first()
            }else{
                console.log(data)
            }
        }
        confirmRegistration()
    },[navigate, userId, message])

    return (
        <div className="site-content centered">
        <div>
            <LoadingSpinner/>
            <h2><Link to="/">Ticketzone</Link></h2>
            <h1>{message}</h1>
        </div> 
    </div>
    )
}

export default RegisterConfirm
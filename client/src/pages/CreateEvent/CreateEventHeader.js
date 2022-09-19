import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../../store'
import './CreateEventHeader.css'

function CreateEventHeader() {

    const {userData} = useAuthState() 

    return (
        <div className='site-header-simple'>
            <div className='brand'>
                <Link to="/">Ticketzone</Link>
             </div>
            <div className='links'>
                <Link to="/dashboard">{userData.email}</Link>
            </div>
        </div>
    )
}

export default CreateEventHeader
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../../store/auth'
import Avatar from '../ui/Avatar'
import './HeaderSimple.css'

function HeaderSimple() {

    const {userData} = useAuthState() 

    return (
        <header className='site-header-simple'>
            <div className='brand'>
                <Link to="/home">Ticketzone</Link>
             </div>
            <div className='links'>
                <span id="user"><Avatar size="30"/> {userData.email}</span>
            </div>
        </header>
    )
}

export default HeaderSimple
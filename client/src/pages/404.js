import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Page from '../components/layout/Page'

import './404.css'

function PageNotFound() {

    const navigate = useNavigate()
    
    return (
    <Page noHeader className="centered">
        <div id='page-not-found'>
            <h2><Link to="/home">Ticketzone</Link></h2>
            <h1>Oooops... Nothing here</h1>
            <div className='align-items-center link' style={{cursor: 'pointer'}} onClick={e => navigate(-1)}><span style={{marginRight: '10px'}}className="material-icons-outlined">keyboard_backspace</span>Go back</div>
        </div> 
    </Page>
  )
}

export default PageNotFound
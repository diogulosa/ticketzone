import React from 'react'
import { Link } from 'react-router-dom'
import './SpinningLogo.css'

function SpinningLogo({size}) {
  return (
    <div className='logo-container'>
      <Link to="/home">
      <span className='logo'>T</span>
      <div className='curtain'></div>
      <span className='logo-text'>icketzone</span>
      </Link>
    </div>
          
  )
}

export default SpinningLogo
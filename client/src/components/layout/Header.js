import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuthDispatch, useAuthState, logout} from '../../store/auth'
import DropDownMenu from '../ui/DropDownMenu'
import SpinningLogo from '../../components/ui/SpinningLogo'
import Button from '../../components/ui/Button'

import './Header.css'

function Header() {

  const {loggedIn, userData} = useAuthState()
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()
  const [useLogo, setUseLogo] = useState(false)
  const [menuIsVisible, setMenuIsVisible] = useState(false)

  function handleLogOut(e){
    e.preventDefault()
    logout(dispatch)
    navigate('/')
  }

  useEffect(() => {
    window.addEventListener('scroll', function(){
      window.scrollY > 20 ?  setUseLogo(true) : setUseLogo(false)
    })
    window.addEventListener('resize', function(){
      setMenuIsVisible(false)
    })
  }, [window])
  
  function toggleMenuVisibility(e){
    if(menuIsVisible){
      setMenuIsVisible(false)
    }else{
      setMenuIsVisible(true)
    }
  }
  
  return (
    <div className='site-header-wrapper'>
    <header className='site-header'>
      <div className='brand'>
          {useLogo ? <SpinningLogo size={30}/> : <Link to="/home">Ticketzone</Link>}
      </div>
      
      <div className='links-container'>
        <div className='links'>
            <Link to="/events/create">+ Create event</Link>

            <DropDownMenu header="Organize">
                <li><Link to="/why-us">Why Ticketzone?</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
            </DropDownMenu>
          
            {loggedIn ? null : <><Link className="auth" to="/log-in">Log in</Link><Link className="auth" to="/register">Sign up</Link></>}
          
            {loggedIn ? <DropDownMenu header={<>{userData.email}</>}>
                <li><Link to="/dashboard">Account</Link></li>
                <li><Link to="/" onClick={handleLogOut}>Log out</Link></li>
            </DropDownMenu> : null}
        </div>
        <Button onClick={toggleMenuVisibility} id="mobile-menu-btn"><span className='material-icons'>menu</span></Button>
      </div>
      
    </header>
    <div className={`links-mobile ${menuIsVisible ? 'show' : null}`} >
      <Link to="/events/create">Create event</Link>

      <DropDownMenu header="Organize">
        <ul>
          <li><Link to="/why-us">Why Ticketzone?</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
        </ul>
      </DropDownMenu>
    
      {loggedIn ? null : <div className='auth'><Link to="/log-in">Log in</Link><Link to="/register">Sign up</Link></div>}
    
      {loggedIn ? <DropDownMenu header={<>{userData.email}</>}>
        <ul>
          <li><Link to="/dashboard">Account</Link></li>
          <li><Link to="/" onClick={handleLogOut}>Log out</Link></li>
        </ul>
      </DropDownMenu> : null}
    </div>
  </div>
  )
}

export default Header
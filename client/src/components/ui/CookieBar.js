import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import './CookieBar.css'

function CookieBar({acceptCookies, declineCookies, setCookieOptions}) { 

  return (
    <div id='cookie-warning-footer'>
        <p className='heading'>About cookies on this site</p>
        <p className='mb-20'>Utilizamos cookies para personalizar a sua experiência no nosso site e a tornar ainda melhor. Consulte a nossa <Link to="/privacy-policy">Política de Privacidade</Link> para ficar a saber mais e para gerir as suas preferências pessoais na nossa <Link to="/">Ferramenta Consentimento Cookie</Link> Ao utilizar o nosso site, está a concordar com a nossa utilização de cookies.</p>
        <div className='spread'>
            <Button onClick={declineCookies}>Declinar</Button>
            <div className='spread'>
                <Button className="mr-20" onClick={setCookieOptions}>Opções</Button>
                <Button className="btn-brand" onClick={acceptCookies}>Aceitar</Button>
            </div>
        </div>
    </div>
  )
}

export default CookieBar
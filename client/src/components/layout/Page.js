import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './Page.css'
import Content from './Content'
import HeaderSimple from './HeaderSimple'
import CookieBar from '../ui/CookieBar'
import { createCookie } from '../../utils'
import MobileAppBar from '../ui/MobileAppBar'

function Page({children, className, footer, headerSimple, noHeader}) {

  const [hasCookies, setHasCookies] = useState(false)
  const [contentHeight, setContentHeight] = useState()
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

    function findCookie(cookieName) {
      const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(cookieName))
      ?.split('=')[1];
      if(cookieValue) setHasCookies(true)
    }

    function acceptCookiesHandler(e){
      createCookie('defs', 'allowed-all', 10000000)
      setHasCookies(true)
     }
     function declineCookiesHandler(e){
      createCookie('defs', 'allowed-none', 10000000)
      setHasCookies(true)
     }

     function setCookieOptionsHandler(e){
      console.log('set the cookie options thing');
      setHasCookies(true)
     }

     function checkForIOSDevices() {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.userAgentData)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }

    function checkForAndroidDevices(){
      const ua = navigator.userAgent.toLowerCase();
      return ua.indexOf("android") > -1;
    }

    useEffect(() => {
      var el = document.querySelector('header')
      if(el){
        var h = el.clientHeight + 'px'
        setContentHeight(h)
      }
      findCookie('defs')
      let deniedAppDownload = localStorage.getItem('denied-download-app')
      if(!deniedAppDownload){
        let ios = checkForIOSDevices()
        let android = checkForAndroidDevices()
        setIsIOS(ios)
        setIsAndroid(android)
      }
      
    }, [hasCookies])

    return (
      <>
      {isIOS || isAndroid ? <MobileAppBar ios={isIOS} android={isAndroid} /> : null}
      {!hasCookies ? <CookieBar acceptCookies={acceptCookiesHandler} declineCookies={declineCookiesHandler} setCookieOptions={setCookieOptionsHandler}/> : null}
      <div className='site-wrapper'>
        {headerSimple ? <HeaderSimple /> : noHeader ? null : <Header />}
          <Content style={{minHeight: contentHeight ? `calc(100vh - ${contentHeight} )` : '100vh'}} className={className && className}>
                {children}
          </Content>
      {footer && <Footer/>}
     
      </div>
      </>
    )
}

export default Page
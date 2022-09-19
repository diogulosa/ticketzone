import React from 'react'

import './CheckOut.css'

function CheckOut(props) {
  return (
    <div className='order-details'>
        <div className='event-info'>
            <h1>{props.eventTitle}</h1>
            <p>{props.eventDate}</p> 
            <div className='image'>
              <img src={props.image} alt={`Ticketzone | ${props.eventTitle}`} />
            </div>        
        </div>
          <ul>
              <li className='bold'>Order summary</li>
              <li><span>{props.ticketQty} x {props.ticketName}</span><span>€ {props.ticketPrice}</span></li>
              <li className='total bold'><span>Total</span>€ {props.totalAmount}</li>
          </ul>
          <div>{props.children}</div>
    </div>
  )
}

export default CheckOut
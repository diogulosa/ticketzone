import React from 'react'
import Button from '../../components/ui/Button'
import '../../components/ui/Button.css'
import './SelectTickets.css'

function SelectTickets(props) {
    
  return (
    <>
    <div className='select-tickets-header'>
            <h1>{props.title}</h1>
            <p>{props.date}, {props.time}</p>
            <p>{props.location}</p>
    </div>

    <form id="select-tickets">
      <div className='spread'>
        <div className='img-container'>
          <img src={props.imgSrc} alt={`Ticketzone | ${props.title}`}/>
        </div>
        <div className='ticket-name'>{props.ticketName}</div>
        <div className='ticket-price'>€{props.price}</div>
        <div className='btn-container'>
              <div className='btn-group'>
                  <Button type='button' className="btn-circle prev" disabled={props.disableMinus} onClick={props.onClickMinus}>
                      <span className='material-icons'>remove</span></Button>
                  <span>{props.ticketCount}</span>
                  <Button type='button' className="btn-circle next" onClick={props.onClickPlus}>
                    <span className='material-icons'>add</span>
                  </Button>
              </div>
          </div>
        </div>        
    </form>
    </>
  )
}

export default SelectTickets
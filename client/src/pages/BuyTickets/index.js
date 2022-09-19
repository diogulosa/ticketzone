import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'

import './BuyTickets.css'
import SelectTickets from './SelectTickets'
import BuyerDetails from './BuyerDetails'
import CheckOut from './CheckOut'
import { useAuthState } from '../../store/auth'
import { commafy } from '../../utils'
import { arrayBufferToBase64 } from '../../utils'

function BuyTickets() {

    const [numberOfProducts, setNumberOfProducts] = useState(0);
    const {userData} = useAuthState()
    const [step, setStep] = useState(1)
    const [event, setEvent] = useState({})
    const params = useParams()
    const navigate = useNavigate()
    const eventId = params.id
    

    useEffect(() => {
        async function getEventById(id){
            let res  = await fetch('/events/' + id)
            let data = await res.json()
            if(data.event){
                let {image} = data.event
                var base64Flag = `data:${image.contentType};base64,`;
                var imgStr = arrayBufferToBase64(image.data.data)
                data.event.image = base64Flag + imgStr
                setEvent(data.event)
            }else{
                console.log('cenas')
            }
        }
        getEventById(eventId)
    }, [eventId])
    

    async function createOrder(resultData){
        console.log(resultData);
        let payload
        if(resultData.status === 'COMPLETED'){
            payload = {
                event: params.id,
                ticketQty: numberOfProducts,
                totalAmount: numberOfProducts * Number(event.ticketPrice),
                isPaid: true,
                paymentResult: {id: resultData.id, status: resultData.status, updateTime: resultData.update_time, email_address: resultData.payer.email_address}
            }
            let res = await fetch('/orders/new', {method: 'POST', body: JSON.stringify(payload),  headers: {'x-access-token': userData.auth_token, 'Content-type': 'application/json'}})
            let data = await res.json()
            if(data.success){
                navigate('/')
            }
        }
        
        
    }

    function handleNextBtnClick(e){
        if(numberOfProducts > 0 ) {
            setStep(step +1)
        }
        if(step === 3){
            //createOrder()
        }
    }
 

    return (
        <div className='site-wrapper bg-black'>
        <header className='buy-tickets-header'>
            <div className='brand'>
                <Link to="/">Ticketzone</Link>
            </div>
            <Link to="#" className={`step${step === 1 ? ' active' : ' disabled'}`}>
                <span className='material-icons-outlined'>add_shopping_cart</span> 
                Select Tickets
            </Link>
            <Link to="#" className={`step${step === 2 ? ' active' : ' disabled'}`}>
                <span className='material-icons-outlined'>badge</span> 
                Buyer Details
            </Link>
            <Link to="#" className={`step${step === 3 ? ' active' : ' disabled'}`}>
                <span className='material-icons-outlined'>payments</span>Check out
            </Link>
        </header>
        <div className='order-content flex-container centered'>
            
            <div className='f-columns'>
                {step === 1 && <SelectTickets location={event.city + ', ' + event.country} imgSrc={event.image} ticketName={event.ticketName} title={event && event.title} date={event && new Date(event.dateStart).toDateString()} time={event && event.timeStart} price={event.ticketPrice} onClickMinus={e => setNumberOfProducts(numberOfProducts - 1)} ticketCount={numberOfProducts} onClickPlus={e => setNumberOfProducts(numberOfProducts + 1)} disableMinus={numberOfProducts > 0 ? false : true} />}
                {step === 2 && <BuyerDetails  />}
                {step === 3 && <CheckOut eventDate={new Date(event.dateStart).toDateString()} image={event.image} ticketName={event.ticketName} eventTitle={event.title} ticketQty={numberOfProducts} ticketPrice={commafy(event.ticketPrice)} totalAmount={commafy(numberOfProducts * Number(event.ticketPrice))}></CheckOut>}
            </div>
            
            
        </div>

        
        
        <footer className='buy-tickets-footer'>
            <Button disabled={step !== 1 ? false : true} className="prev" onClick={e => setStep(step -1)} >Previous</Button>
            <div className='summary'>
                <div className='details'>
                    <p>{numberOfProducts} tickets</p>
                    <p>Total: {numberOfProducts * Number(event.ticketPrice)}.00€ </p>
                </div>
                {step < 3 ? <Button className="next" disabled={ numberOfProducts === 0 ? true : false} onClick={handleNextBtnClick}>Next</Button> : <Button className="next disabled" disabled={numberOfProducts * Number(event.ticketPrice) !== 0}>Next</Button>}
            </div>
            
        </footer>
        
        </div>
    )
}

export default BuyTickets
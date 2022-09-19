import React from 'react'
import {QRCodeSVG} from 'qrcode.react'

import './Ticket.css'

function Ticket({eventTitle, eventAddress,eventDate, orderId, orderedBy, orderDate, attendeeName, eventImage}) {

    return (
        <div className='ticket'>
            <div className='left'>
                <h1>{eventTitle}</h1>
                <p>{eventAddress}</p>
                <p>{eventDate}</p>
                <footer>
                    <div className='order-info'>
                        <p><span className='p-header'>Order information:</span><br/>
                            {`Order #${orderId}. Ordered by ${orderedBy} on ${orderDate}`}
                        </p>
                    </div>
                    <div className='name-info'>
                        <p><span className='p-header'>Name:</span><br/>
                            {attendeeName}
                        </p>
                    </div>
                </footer>
            </div>
            <div className='right'>
                <div className='event-img-container'>
                    <img src={eventImage} alt={eventTitle} />
                </div>
                <div className='event-qr-container'>
                    {<QRCodeSVG size="100" value={orderId} />}
                </div>
            </div>
        </div>
    )
}

export default Ticket
import React, { useState } from 'react'
import Page from '../components/layout/Page'
import { commafy } from '../utils'

import './Pricing.css'

function Pricing() {


    const [price, setPrice] = useState('')
    const [ticketQty, setTicketQty] = useState('')
    const [absorbFees, setAbsorbFees] = useState('0')
    
    function handlePriceChange(e){
        setPrice(e.target.value)
    }

    function handlePriceKeyDown(e){
        if(e.key === 'e'){
            e.preventDefault()
        }
        if(e.target.value.includes('.')){
            let segments = e.target.value.split('.')
            if(segments[1].length > 1 && e.key !== 'Backspace' && e.key !== 'Tab'){
                e.preventDefault()
                segments[1] = segments[1].substring(0, 2)
                setPrice(segments[0] + '.' + segments[1])
            }else if(segments[1].length > 0 && segments[1].length < 2 && (e.key === 'Enter' || e.key === 'Tab')){
                e.target.value = e.target.value + '0'
                setPrice(e.target.value)
            }
        }
        setPrice(e.target.value)
    }

    function composePrice(e){
        if(!price.includes('.')){
            setPrice(Number(Math.round(price * 100) / 100).toFixed(2))
        }
    }

    function handleTicketQtyChange(e){
        setTicketQty(e.target.value)
    }

    function handleTicketQtyKeyPress(e){
        if(e.key === '.' || e.key === ','){
            e.preventDefault()
        }
    }
    return (
        <Page className="bg-black" footer>
            <div className='container f-columns'>
            <div className='flex-container' id='pricing-wrapper'>
            <h1 className='text-center'>Estimate your earnings</h1>
                <form id="calc-earnings">
                    <div style={{width: '100%'}}>
                        <div className='input-group'>
                            <label htmlFor='price'>
                                <span className='material-icons'>euro</span>
                            </label>   
                            <input type="number" name="price" placeholder='Ticket price' value={price} onChange={handlePriceChange} onBlur={composePrice} onKeyDown={handlePriceKeyDown}/>
                            <span style={{fontWeight: '600'}} className='material-icons'>close</span>
                            <input type="number" name="qty" value={ticketQty} onChange={handleTicketQtyChange}
                            onKeyDown={handleTicketQtyKeyPress}
                            placeholder='Tickets sold' />
                        </div> 
                        <div className='input-group'>
                            <label htmlFor='fee-handling'><span className='material-icons'>percent</span></label>
                            <select name="fee-handling" defaultValue={absorbFees} onChange={e => setAbsorbFees(e.target.value)}>
                                <option value="0">Absorb fees</option>
                                <option value="1">Charge attendees</option>
                            </select>
                        </div>
                    </div>
                    
                </form>
                <div id="estimated-earnings">
                    <div className='inner'>
                        <div className='earnings'>
                            <h2>Your earnings</h2>
                            {absorbFees === '0' ? 
                            <h1>€{commafy((Math.round(price * 100) / 100 * Number(ticketQty) * 0.9).toFixed(2)) }</h1> 
                            : 
                            <h1>€{commafy((Math.round(price * 100) / 100 * Number(ticketQty)).toFixed(2))}</h1>}
                        </div>
                        
                        <div className='price'>
                            <h2>Final ticket price</h2>
                            <h1>{absorbFees === '0' ? '€' + commafy((Math.round(price * 100) / 100).toFixed(2)) : '€' + commafy((Math.round(price * 1.10 * 100) / 100).toFixed(2))}</h1>
                        </div>
                        
                    </div>
                </div>
                </div>
            </div>
        </Page>
    )
}

export default Pricing
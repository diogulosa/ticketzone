import React from 'react'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'

function Tickets({ticketName, onChangeTicketName, ticketPrice, onChangeTicketPrice, ticketQty, onChangeTicketQty, feeHandling, setFeeHandling}) {

    function handleNumberInput(e){
        if(e.key === '.'){e.preventDefault()}
        e.target.value = e.target.value.replace(/[^0-9]*/g,'')
    }

    return (
        <section className='form-section'>
            <h2 className='heading'>Bilhetes</h2>
            <Input type="text" name="ticketName" label="Ticket name" onChange={onChangeTicketName} value={ticketName} required />
            <div className='flex-container'>
                <Input className='half-w' type="number" name="ticketPrice" label="Ticket Price" onChange={onChangeTicketPrice} value={ticketPrice} required />
                <Input className='half-w' type="number" name="ticketQty" label="Tickets Available" step="1" onKeyDown={handleNumberInput} onInput={handleNumberInput} onChange={onChangeTicketQty} value={ticketQty} required />
            </div>
            <Select options={['Absorb fees', 'Charge attendees']} label="Fee handling" value={feeHandling} onChange={setFeeHandling} required/>
        </section>
    )
}

export default Tickets
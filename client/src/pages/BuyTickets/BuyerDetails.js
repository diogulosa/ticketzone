import React from 'react'
import Input from '../../components/ui/Input'

function BuyerDetails() {

  
  
  return (
    <form>
        <h1>Buyer details</h1>
        <p>Your receipt & tickets will be sent to this email.</p>
        <Input type="text" label="Name" />
        <Input type="email" label="Email" />
        <Input type="email" label="Confirm email" />
    </form>
  )
}

export default BuyerDetails
import React, { useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

function InsertCountry() {

    const [newCountry, setNewCountry] = useState('')

    async function submitCountry(e){
        let res = await fetch('countries/' + newCountry, {method: 'POST'})
        let data = await res.json()
        if(data.success){
            setNewCountry('')
        } 
    }

  return (
    <div className='container'>
        <Input label="Country" type="text" value={newCountry} onChange={e => setNewCountry(e.target.value)} />
        <Button label="Save" onClick={submitCountry} />
    </div>
    
  )
}

export default InsertCountry
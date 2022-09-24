import React, { useEffect, useState } from 'react'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'

function Location({venue, onChangeVenue, zipCode, onChangeZipCode, city, onChangeCity, countryValue, onChangeCountry, address1, onChangeAddress1, address2, onChangeAddress2}){

    const [countries, setCountries] = useState()

    // function onChangeAddress1(e){
    //     setAddress({...address, line1: e.target.value})
    // }

    // function onChangeAddress2(e){
    //     if(address.line1 !== '' && address.line2 !== ''){
    //         setAddress({...address, line2: e.target.value, complete: address.line1 + ', ' + address.line2})
    //     }
    // }

    async function getCountries(){
        let res = await fetch('/countries')
        let data = await res.json()
        if(data.countries){
            setCountries(data.countries)
        }
    }

    useEffect(() => {
        getCountries()
    }, [])
    

    return (
    <section className='form-section'>
        <h2 className='heading'>Location</h2>
        <Input type="text" name="venue" label="Venue" onChange={onChangeVenue} value={venue} />
        <Input type="text" name="address1" label="Address Line 1" onChange={onChangeAddress1} 
        value={address1} required />
        <Input type="text" name="address2" label="Address Line 2" onChange={onChangeAddress2}
        value={address2} />
        <Input type="text" name="zipCode" label="Zip Code" onChange={onChangeZipCode} value={zipCode} required />
        <Input type="text" name="city" label="City" onChange={onChangeCity} value={city} required/>
        <Select name="country" label="Country" options={countries} onChange={onChangeCountry} value={countryValue} required/>
    </section>
  )
}

export default Location
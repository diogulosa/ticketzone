import React, { useState } from 'react'
import RadioButton from '../../components/ui/RadioButton'
import Select from '../../components/ui/Select'

function Visibility({setToPrivate, setToPublic, setPrivacySettings, privacySettings}) {

    const [privacy, setPrivacy] = useState(false)

    function onClickPublic(e){
        setPrivacy(false)
        setToPrivate()
    }

    function onClickPrivate(e){
        setPrivacy(true)
        setToPublic()
    }

    return (
        <section className='form-section'>
            <h2 className='heading'>Visibility</h2>
            <div className='radio-group'>
                <h3>Who can see your event?</h3>
                <RadioButton name="privacy" id="public" label="Public" onClick={onClickPublic} defaultChecked={true} />
                <RadioButton name="privacy" id="private" label="Private" onClick={onClickPrivate}/>
            </div>
            {privacy && <Select label="Privacy settings" options={['Anyone with the event url', 'Anyone with an email invitation', 'Require password']} onChange={setPrivacySettings} value={privacySettings} required />}
        </section>
    )
}

export default Visibility
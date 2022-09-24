import React from 'react'
import Page from '../components/layout/Page'
import Input from '../components/ui/Input'

function EntryScreen() {
  return (
    <Page noHeader noFooter className="centered">
        <form className='auth-form'>
            <h2>Under construction</h2>
            <p>Guests only</p>
            <Input type='text' label="E-mail" />
            <Input type="password" label="Password" />
        </form>
    </Page>
  )
}

export default EntryScreen
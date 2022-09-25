import React from 'react'
import Button from '../../components/ui/Button'

import './FormNav.css'

function FormNav({onClickPrev, onClickNext, step, onClickSave, onClickPublish, disableNext}) {
  return (
    <div className='form-nav'>
        {step === 1 ? <Button style={{visibility: 'hidden'}} >Previous</Button> : <Button style={{visibility: 'visible'}}  onClick={onClickPrev}>Previous</Button>}
        {step < 5 && <Button style={{visibility: 'visible'}} disabled={disableNext} onClick={onClickNext} >Next</Button>}
        {step === 5 && <div className='spread save-publish'><Button style={{marginRight: '30px'}} id="draft" onClick={onClickSave} >Save as draft</Button><Button id="active" onClick={onClickPublish}>Publish</Button></div>}
    </div>
  )
}

export default FormNav
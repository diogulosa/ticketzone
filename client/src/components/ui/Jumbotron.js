import React from 'react'
import './Jumbotron.css'

function Jumbotron(props) {
  return (
    <div style={{backgroundImage: props.image}} className="jumbotron">
        <div className='text'>
            <p className='jumbotron-title'>{props.title}</p>
            <p className='jumbotron-caption'>{props.caption}</p>
        </div>
    </div>
  )
}

export default Jumbotron
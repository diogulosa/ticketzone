import React from 'react'
import './Avatar.css'
import avatar from '../../images/avatar-default.jpeg'

function Avatar(props) {
  return (
    <div className='avatar' style={{width: props.size + 'px', height: props.size + 'px'}}>
        <div className='img-container'>
            {props.img ? <img src={props.img} alt='Ticketzone' /> : <img src={avatar} alt='Ticketzone'/>}
        </div>
    </div>
  )
}

export default Avatar
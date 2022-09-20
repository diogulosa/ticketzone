import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

function Card(props) {

    return (
      <Link to={`/event/${props.id}/#`} className="card">
            <div className='media'>
                <img src={props.image} alt={props.title}/>
            </div>
            <div className='info'>
                <p className='category'>{props.category.name}</p>
                <p className='title'>{props.title}</p>
                <div className='bottom'>
                    {/* <p className='date'>{new Date(Number(props.date)).toDateString()}</p> */}
                    <p className='location'>{props.location}</p>
                </div>
                
            </div>
      </Link>
    
  )
}

export default Card
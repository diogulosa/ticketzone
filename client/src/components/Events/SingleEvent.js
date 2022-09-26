import React from 'react'
import './SingleEvent.css'
import {Helmet} from "react-helmet";


function SingleEvent(props) {
  
  return (
      <>
      <Helmet>
        <meta property='title' content={props.title} />
        <meta property="og:image" itemprop="image" content="%PUBLIC_URL%/metallica.jpeg" />
      </Helmet>
        <div className='event-details-bg-image'>
          <img src={props.image} alt={`Ticketzone | ${props.title}`}/>
        </div>
        <div className='container'>
          
          <div className='breadcrumbs'>Home / Events / <span className='text-brand'>{props.title}</span></div>
          <div className='se-main'>
          
            <div className='media'>
              <img src={props.image} alt={props.title} />
            </div>
            <section>
              <h3>What's happening</h3>
              <p className='description'>{props.description}</p>
            </section>
            <section>
              <h3>Organizer:</h3>
              <p>{props.organizer}</p>
            </section>
            {props.tags[0] !== '' &&
                <section>
                  <h3>Tags</h3>
                   <ul className='tag-pills'>{props.tags.map((item, key) => <li key={key}>{item}</li>)}</ul>
                </section> 
                }
        </div>

        <div className='aside'>
                
                <section className='section'>
                  <h3>Tickets</h3>
                  <p className='spread'><span>{props.ticketName}</span><span>{props.price === 0 ? 'Free' : props.price + ' €'}</span></p>
                </section>

                <section className='section'>
                  <h3>Date and time</h3>
                  <p className='date'>{props.date}</p>
                </section>
                
                <section className='section'>
                  <h3>Location</h3>
                  <p className='venue'>{props.venue}</p>
                  <p className='address'>{props.address}</p>
                  <p className='location'>{props.location}</p>
                </section>

                <button className='btn' onClick={props.onClickBuy} type='button'>Buy tickets</button>
        </div>
        </div>
        <div id='buy-tickets'>
          <button className='btn'  onClick={props.onClickBuy}>BUY TICKETS</button>
        </div>
    </>
    
  )
}

export default SingleEvent
import React from 'react'

function Footer() {
  return (
    <div className='site-footer'>
      <div className="container">
        <div className='col'>
          <ul>
            <li className='list-header'>Organizers</li>
            <li>Why Ticketzone?</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div className='col'>
          <ul>
            <li className='list-header'>Buyers</li>
            <li>Browse events</li>
            <li>My tickets</li>
          </ul>
        </div>
        <div className='col'>
          <ul>
            <li className='list-header'>Discover</li>
            <li>Events in Porto</li>
            <li>Events in Lisbon</li>
          </ul>
        </div>
        <div className='col'>
          <ul>
            <li className='list-header'>Resources</li>
            <li>Contact us</li>
            <li>Send feedback</li>
            <li>Developers</li>
          </ul>
        </div>
        <div className='col'>
          <ul>
            <li className='list-header'>Switch language</li>
            <select id='footer-select-lang' name='lang'>
              <option value="0">English</option>
              <option value="1">Portuguese</option>
            </select>
          </ul>
        </div>
      </div>
      </div>
  )
}

export default Footer
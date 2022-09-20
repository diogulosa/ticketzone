import React, { useEffect, useState } from 'react'
import Page from '../components/layout/Page'
import Card from '../components/ui/Card'
import Jumbotron from '../components/ui/Jumbotron'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { arrayBufferToBase64 } from '../utils'
import FilterButton from '../components/ui/FilterButton'

function Home() {

  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState()
  const [loading, setLoading] = useState(false)
  

  async function getCategories(){
    let res = await fetch('categories')
    let {categories} = await res.json()
    setCategories(categories)
  }

  async function getEventsByCategory(catId){
    setLoading(true)
    let res = await fetch('/events/by-category/'+ catId)
    let {events} = await res.json()
    for(let item of events){
      const {image} = item
      var base64Flag = `data:${image.contentType};base64,`;
      var imgStr = arrayBufferToBase64(image.data.data)
      item.image = base64Flag + imgStr
    }
    setEvents(events)
    setLoading(false)
  }

  async function getEvents(){
    setLoading(true)
    const res = await fetch('events')
    const {events} = await res.json()
    for(let item of events){
      const {image} = item
      var base64Flag = `data:${image.contentType};base64,`;
      var imgStr = arrayBufferToBase64(image.data.data)
      item.image = base64Flag + imgStr
    }
    setEvents(events)
    setLoading(false)
  }

  useEffect(()=>{
    if(events.length === 0){
      getEvents()
    }
    getCategories()
  },[])
  
  function handleOptionClick(e){
    e.preventDefault()
    let buttons = document.getElementsByClassName('filter-btn')
    for (const item of buttons) {
      item.classList.remove('active')
    }
    let el = document.getElementsByName(e.target.value)[0]
    if(!el.classList.contains('active')){
      el.classList.add('active')
    }
    if(e.target.value === '0'){
      getEvents()
    }else{
      getEventsByCategory(e.target.value)
    }
    
    
  }

  return (
    <Page className="bg-black" footer>
      <Jumbotron image="url(images/evento.png)" title="PROMOTE, SHARE" caption="and sell tickets for your events" />
      

      <div className='container filters spread'>
          <FilterButton className="active" value="0" name="0" onClick={handleOptionClick}>All</FilterButton>
          {categories && categories.map((item, index) => {
            if(item.count > 0){
              return <FilterButton key={index} onClick={handleOptionClick} name={item._id} value={item._id}>{item.name}</FilterButton>
            }else{
              return null
            } })}
          
      </div>


      <div className='container f-rows'>
        {loading && <LoadingSpinner />}
        {events ? events.map((item, key) => (
        <Card 
          id={item._id} 
          key={item._id}
          category={item.category} 
          image={item.image} 
          title={item.title} 
          date={item.dateStart} 
          location={item.address.city +', ' + item.country} />
        )) : <LoadingSpinner/>}
      </div>
      
    </Page>
  )
}

export default Home
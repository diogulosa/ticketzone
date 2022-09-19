import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import {useAuthState} from '../../../store/auth'

function EventListItem(props) {

    const navigate = useNavigate()
    const [menuVisibilty, setMenuVisibilty] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const {userData} = useAuthState()

    function toggleMenu(e){
        if (menuVisibilty) {
            setMenuVisibilty(false)
        } else {
            setMenuVisibilty(true)
        }
    }

    async function deleteEvent(e){
        e.preventDefault()
        let res = await fetch(`/events/delete/${props.id}`, {method: 'DELETE', headers: {'x-access-token' : userData.auth_token}})
        let data = await res.json()
        if(data.success){
            navigate(0)
        }else{
            console.log(data.error);
        }
    }

    return (
        <>
        <ul className='event-list-item' id={props.id} key={props.id}>
            <li className='item-title'>{props.title}</li>
            <li className='item-date'>{new Date(props.date).toDateString()}</li>
            <li className='item-status'>{props.status}</li>
            <li className='item-options' onClick={toggleMenu}>
                <span className='material-icons'>more_vert</span>
                <ul style={menuVisibilty ? {display: 'block'} : {display: 'none'}} onMouseLeave={e => setTimeout(() => setMenuVisibilty(false),2000)} className='event-list-options'>
                    <li><Link to={`/dashboard/event/${props.id}/edit`}>Edit</Link></li>
                    <li><Link to={`/event/${props.id}`} target="_blank">View</Link></li>
                    <li><Link to="" onClick={e => setShowModal(true)}>Delete</Link></li>
                </ul>
            </li>
        </ul>
        {showModal && 
            <Modal title="Are you sure?" onClose={e => setShowModal(false)}>
                <p>This action is irreversible</p>
                <div className='flex-container space-between'>
                    <Button label="Cancel" onClick={e => setShowModal(false)} />
                    <Button label="Yes. I know what I'm doing" onClick={deleteEvent} />
                </div>
            </Modal>}
        </>
    )
}

export default EventListItem
import { Router } from 'express'
import jwt from 'jsonwebtoken'

import Order from '../models/order-model.js'
import User from '../models/user-model.js'
import Event from '../models/event-model.js'

const router = Router()

router.post('/new', async (req, res) => {   
    const token = req.headers['x-access-token']
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const doc = await User.findOne({email: user.email})
    
    if(doc.password === user.pass){
        
        try {
            if(req.body.paymentResult){
                const order = new Order(
                    {
                        createdBy: doc._id,
                        event: req.body.event,
                        ticketQty: req.body.ticketQty,
                        totalAmount: req.body.totalAmount,
                        paymentResult: req.body.paymentResult,
                        isPaid: true
                    }
                )
            }else{
                const order = new Order(
                    {
                        createdBy: doc._id,
                        event: req.body.event,
                        ticketQty: req.body.ticketQty,
                        totalAmount: req.body.totalAmount,
                        isPaid: true
                    }
                )
            }
            
            const orderComplete = await order.save()
            if(orderComplete){
                try {
                    let event = await Event.findById(req.body.event)
                    let sold = event.ticketsSold + req.body.ticketQty
                    let available = event.ticketsAvailable - req.body.ticketQty
                    if(available === 0){
                        event = await Event.findByIdAndUpdate(req.body.event, {ticketsSold: sold, ticketsAvailable: available, status: 'sold out'})
                    }
                    event = await Event.findByIdAndUpdate(req.body.event, {ticketsSold: sold, ticketsAvailable: available})

                    // EM FALTA:::criar bilhetes enviar emails
                    return res.status(201).json({success: true}) 
                } catch (error) {
                    return res.status(400).json({success: false, error: error})
                }
            }
        } catch (error) {
            return res.status(400).json({success: false, error: error})
        }
    }

})

export default router
import { Router } from 'express'
import multer from 'multer'
import Event from '../models/event-model.js'
import Address from '../models/address-model.js'
import Country from '../models/country-model.js'
import Category from '../models/category-model.js'
import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import {isDatePassed} from './utils/event-utils.js'

const router = Router()

const pathToUpLoadFolder = path.join(process.cwd(), 'uploads')
const upload = multer({ dest: pathToUpLoadFolder})

//GET ALL EVENTS BY 'ACTIVE' STATUS
router.get('/', async (req, res) => {
    let events = []
    //consultar todos os eventos   
    let docs = await Event.find().where({status: 'active'})
    //Actualizar status conforme data
    for(let item of docs){
        var finished = isDatePassed(item.dateStart)
        if(finished){
            let doc = await Event.findByIdAndUpdate(item._id, {status: 'finished'})
            let catId = doc.category
            await Category.findByIdAndUpdate(catId, {$inc: {count: -1}})
        }
    }
    docs = await Event.find().where({status: 'active'}).sort({dateStart: 'desc'})
    for(let item of docs){
        let address = await Address.findById(item.address)
        let category = await Category.findById(item.category)
        if(address){
            let country = await Country.findById(address.country)
            if(country){
                let {_id, title, image, dateStart, timeStart,organizer} = item
                events.push({_id, title, category: category.name, image, dateStart, organizer, timeStart, venue: address.name, address: address.address, city: address.city, country: country.name})
            }
            
        }
    }
    if(events.length > 0){
        res.json({success: true, events})
    }else{
        res.json({success: false, message: 'No events yet'})
    }
    
})

//GET EVENTS BY CATEGORY
router.get('/by-category/:catId', async (req, res) => {
    const {catId} = req.params
    let docs
    let events = []
    if(catId){
        docs = await Event.find().where({status: 'active', category: catId})
        if(docs.length > 0){
            for(let item of docs){
                let category = await Category.findById(item.category)
                let address = await Address.findById(item.address)
                if(address){
                    let country = await Country.findById(address.country)
                    let {name} = country
                    let { city } = address
                    let {_id, title, image, dateStart} = item
                    events.push({_id, title, image, dateStart, city, category: category.name, country: name})
                }
            }
            return res.status(200).json({success: true, events: events})
        }else{
            return res.status(404).json({success: false, message: 'No events in this category!'})
        }
    }
})

//GET EVENT BY ID
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const query = Event.findOne({_id: id})
    const doc = await query.exec()
    const address = await Address.findById(doc.address)
    const category = await Category.findById(doc.category)
    const country = await Country.findById(address.country)
    const {_id, title, organizer, dateStart, timeStart, ticketName, ticketPrice, ticketsAvailable, image, description, tags, eventURL} = doc
    let event ={_id, image, title, organizer, dateStart, timeStart, ticketName, ticketPrice, ticketsAvailable, description, tags, venue: address.name, address: address.address, zipCode: address.zipCode, country: country.name, city: address.city, category: category, eventURL}
    res.status(200).json({success: true, event})
})

//CREATE EVENT
router.post('/create', upload.single('image'), async (req, res) => {

    let tags
    if(req.body.tags){
        tags = req.body.tags.split(',')
    }else{
        tags = []
    }
    
    const pathToFile = path.join(process.cwd(), '/uploads/')

    const addressExists = await Address.findOne({name: req.body.venue, address: req.body.address, zipCode: req.body.zipCode, city: req.body.city, country: req.body.country})

    if(!addressExists){
        const newAddress = new Address({
            name: req.body.venue,
            type: 'event',
            address: req.body.address,
            zipCode: req.body.zipCode,
            city: req.body.city,
            country: req.body.country,
            createdBy: req.body.createdBy
        })
        const address = await newAddress.save()

        await Category.findByIdAndUpdate(req.body.category, {$inc: {count: 1}})

        if(address){
            const eventData = {
                title: req.body.title,
                organizer: req.body.organizer,
                category: req.body.category,
                description: req.body.description,
                address: address._id || null,
                country: req.body.country,
                dateStart: Date.parse(req.body.startDate), 
                dateEnd: Date.parse(req.body.endDate),
                timeStart: req.body.startTime, 
                timeEnd: req.body.endTime,
                ticketName: req.body.ticketName, 
                ticketPrice: req.body.ticketPrice, 
                initialTicketsAvailable: req.body.ticketQty,
                ticketsAvailable: req.body.ticketQty,
                absorbFees: req.body.absorbFees,
                tags: tags,
                status: req.body.status,
                privacy: req.body.privacy,
                privacySettings: req.body.privacySettings,
                createdBy: req.body.createdBy,
                image: {data: fs.readFileSync(pathToFile + req.file.filename), contentType: req.file.mimetype},
                eventURL: req.body.eventURL
            }
            try {
                const newEvent = new Event(eventData)
                let doc = await newEvent.save()
                if(doc){
                    return res.status(201).json({success: true, doc})
                }
            } catch (error) {
                return res.status(400).json({success: false, error: error})
            }
        } 
    }else{
        const eventData = {
            title: req.body.title,
            organizer: req.body.organizer,
            category: req.body.category,
            description: req.body.description,
            address: addressExists._id,
            country: req.body.country,
            dateStart: Date.parse(req.body.startDate), 
            dateEnd: Date.parse(req.body.endDate),
            timeStart: req.body.startTime, 
            timeEnd: req.body.endTime,
            ticketName: req.body.ticketName, 
            ticketPrice: req.body.ticketPrice, 
            initialTicketsAvailable: req.body.ticketQty,
            ticketsAvailable: req.body.ticketQty,
            absorbFees: req.body.absorbFees,
            tags: tags,
            status: req.body.status,
            privacy: req.body.privacy,
            privacySettings: req.body.privacySettings,
            createdBy: req.body.createdBy,
            image: {data: fs.readFileSync(pathToFile + req.file.filename), contentType: req.file.mimetype},
            eventURL: req.body.eventURL
        }
        try {
            const newEvent = await new Event(eventData)
            let doc = await newEvent.save()
            if(doc){
                return res.status(201).json({success: true, doc})
            }
        } catch (error) {
            return res.status(400).json({success: false, error: error})
        }
    }     
})

//DELETE EVENT
router.delete('/delete/:eventId', async (req, res) => {
    let eventId = req.params.eventId
    const token = req.headers['x-access-token'];
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified){
        let doc = await Event.findById(eventId)
        await Category.findByIdAndUpdate(doc._id, {$inc: {count: -1}})
        Event.findByIdAndDelete(eventId, (err, doc) =>{
            if(err){
                res.status(404).json({success: false, error: 'Item not found'})
            }else{
                res.status(200).json({success: true, message: 'Event deleted!'})
            }
        })
    } 
})

//GET EVENT BY USER ID
router.get('/user/:id', async (req, res) => {
    const {id} = req.params
    const query = Event.find().where({createdBy: req.params.id}).sort({dateStart: 'desc'})
    const docs = await query.exec()
    if(docs){
        let events = []
        for(let item of docs){
            let {_id, title, dateStart, status} = item
            events.push({_id, title, dateStart, status})
        }
    return res.status(200).json({success: true, events})
    }
    
})

//UPDATE EVENT BASIC INFO
router.post('/basic-info/:id', async (req, res) =>{
    const eventId = req.params.id
    const token = req.headers['x-access-token'];
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified){
        let cat = await Category.findById(req.body.category)
        const doc = await Event.findByIdAndUpdate(eventId, {title: req.body.title, organizer: req.body.organizer, category: req.body.category, tags: req.body.tags})
        if(cat._id !== doc.category){
            cat = await Category.findByIdAndUpdate(cat._id, {$inc: {count: 1}})
            await Category.findByIdAndUpdate(doc.category, {$inc: {count: -1}})
        }
        res.status(200).json({success: true, message: 'Event updated'})
    }
}) 

//UPDATE EVENT LOCATION
router.post('/location/:id', async (req, res) =>{
    const eventId = req.params.id
    const token = req.headers['x-access-token'];
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified){
        const doc = await Event.findById(eventId)
        let address = await Address.findByIdAndUpdate(doc.address, {name: req.body.venue, address: req.body.address, zipCode: req.body.zipCode, city: req.body.city, country: req.body.country})
        if(address) return res.status(200).json({success: true, message: 'Event updated'})
        return res.status(500).json({success: false, message: 'Something went wrong'})
    }
}) 

//UPDATE EVENT DATE AND TIME
router.post('/date-and-time/:id', async (req, res) =>{
    const eventId = req.params.id
    const token = req.headers['x-access-token'];
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified){
        const doc = await Event.findByIdAndUpdate(eventId, {dateStart: req.body.dateStart, dateEnd: req.body.dateEnd, timeStart: req.body.timeStart, timeEnd: req.body.timeEnd})
        if(doc) return res.status(200).json({success: true, message: 'Event updated'})
        return res.status(500).json({success: false, message: 'Something went wrong'})
    }else{
        res.json({success: false, message: 'You don\'t have the required permissions'})
    }
}) 

//UPDATE EVENT DETAILS
router.post('/details/:id', upload.single('image'), async (req, res) =>{
    const eventId = req.params.id
    const token = req.headers['x-access-token'];
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified && req.file){
        const doc = await Event.findByIdAndUpdate(eventId, {description: req.body.description, image: {data: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.filename )), contentType: req.file.mimetype}, eventURL: req.body.eventURL })
        if(doc) return res.status(200).json({success: true, message: 'Event updated'})
        return res.status(500).json({success: false, message: 'Something went wrong'})
    }else if(verified){
        const doc = await Event.findByIdAndUpdate(eventId, {description: req.body.description, eventURL: req.body.eventURL})
        if(doc) return res.status(200).json({success: true, message: 'Event updated'})
        return res.status(500).json({success: false, message: 'Something went wrong'})
    }
})

export default router
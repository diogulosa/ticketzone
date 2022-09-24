import { Router } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import User from '../models/user-model.js'
import validator from 'validator'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config()

const router = Router()

let transporter = nodemailer.createTransport({
    host: 'mail.diogolosa.pt',
    port: 465,
    secure: true,
    auth: {user: 'info@diogolosa.pt', pass: process.env.MAILPASS}
  });

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json({users})
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id)
    if(user){
        const {_id, email} = user
        res.json({success: true, userData: {id: _id, email: email}})
    }else{
        res.json({success: false, message: 'No user with this id'})
    }
    
})

//USER REGISTRATION ROUTE

router.post('/create/', async (req, res) => {
    const {email, password} = req.body
    res.send('not ready to register anyone at this moment :)')
    
    if(email, password){
        const query = User.find({email: email})
        let doc = await query.exec()

        if(doc.length > 0){
            return res.json({message: 'Email is already in user'})
        }

        if(!validator.isEmail(email)){
            return res.json({success: false, message: 'Please provide a valid email.'})
        }
        
        if(password.length < 5){
            return res.json({success: false, message: 'Valid passwords must be at least 5 characters long.'})
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if(err){
                return console.log(err)
            }else{
                const user = new User({email: email, password: hash})
                const doc = await user.save()
                if(doc){
                    var message = {
                        from: 'info@diogolosa.pt',
                        to: email,
                        bcc: 'diogolosa@gmail.com',
                        envelope: {
                            from: 'Ticketzone <info@diogolosa.pt>',
                            to: email
                        },
                        subject: 'Ticketzone account creation',
                        html: `<body><p>Dear user,</p><p>To finish your account registration please click <a href="http://localhost:3000/user-registration/verify/${doc._id}">here</a></p><p>Best regards,</p><p>Ticketzone team</p></body>`
                    }
                    transporter.sendMail(message, (err, info) => {
                        if (err) {
                            return console.log(err);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                        return res.json({success: true, message: 'To complete your account registration, please check your inbox'})
                    })
                }
            }})

        
    }else{
        res.json({success: false, message: 'Please fill in the required fields.'})
    }
})

//verificação de registo
router.post('/create/:userId', async (req, res) =>{
    const id  = req.params.userId
    const userActivated = await User.findByIdAndUpdate(id, {active: true})
    if(userActivated){
        return res.status(201).json({success: true})
    }

})

router.post('/validate', async (req, res) => {
    const {email, password} = req.body
    if(email, password){
        const user = await User.findOne({email: email, active: true})
        if(!user){
            return res.status(404).json({success: false, message: 'No account was found associated with this email. '})
        }
        bcrypt.compare(password, user.password, (err, success) => {
            if(err || !success){
                return res.status(400).json({success: success, message: err || "Password is incorrect"})
            }
            const {id} = user
            const token = jwt.sign({email: user.email, pass: user.password}, process.env.JWT_SECRET)
            return res.status(200).json({success: true, user: {id: id, email: email, name: `${user.fname} ${user.lname}`, auth_token: token}})
        })
    }else{
        console.log(req.body)
        res.json({success: false, message: 'Please fill in the required fields.'})
    }
})

router.put('/update/:userId', async (req, res) => {
    var userId = req.params.userId
    var doc = await User.findByIdAndUpdate(userId, {fname: req.body.fname, lname: req.body.lname})
    if(doc){
        res.status(200).json({success: true, user: {fname: doc.fname, lname: doc.lname}})
    }
})

router.post('/reset-password', async (req, res) => {
    const {email} = req.body
    if(email){
        let doc = await User.findOne({email: email})
        if(doc){
            var message = {
                from: 'info@diogolosa.pt',
                to: 'diogolosa@gmail.com',
                subject: 'Ticketzone password reset',
                html: `<body><p>Dear ${email},</p><p>To reset your password please click here <a href="http://localhost:3000/reset-password/${doc._id}">here</a></p><p>Best regards,</p><p>The Ticketzone team</p></body>`
            }
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    return console.log(err);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                return res.json({success: true, message: 'An email has been sent to your inbox'})
            })
            
        }else{
            res.json({success: false, message: 'Please provide a valid email account'})
        }
    }else{
        res.json({success: false, message: 'Please provide a valid email account'})
    }
})

router.post('/update-pass', async (req, res) => {
    const {id, pass} = req.body
    if(id && pass){
        bcrypt.hash(pass, 10, async (err, hash) => {
            if(err){
                console.log(err);
            }else{
                let doc = await User.findByIdAndUpdate(id, {password: hash})
                if(doc){
                    res.json({success: true, message: 'Password successfully updated!'})
                }
            }
        })
    }else{
        res.json({succes: false, message: 'Something went wrong'})
    }
})


export default router
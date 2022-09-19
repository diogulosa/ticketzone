import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import dotenv from 'dotenv'
import userRoutes from './routes/user-routes.js'
import eventRoutes from './routes/event-routes.js'
import categoryRoutes from './routes/category-routes.js'
import orderRoutes from './routes/order-routes.js'
import countryRoutes from './routes/country-routes.js'
import ticketRoutes from './routes/ticket-routes.js'
import path from 'path'

dotenv.config()
const app = express()

const connStr = process.env.DATABASE_URL;

mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use('/users', userRoutes)
app.use('/events', eventRoutes)
app.use('/categories', categoryRoutes)
app.use('/orders', orderRoutes)
app.use('/countries', countryRoutes)
app.use('/tickets', ticketRoutes)
app.get('/config/paypal', (req, res) => res.json({clientId: process.env.PAYPAL_CLIENT_ID}))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(process.cwd(), 'front','build')))
    app.get('*', (req, res) => {        
        res.sendFile(path.join(process.cwd(), 'front','build', 'index.html'))
    })
}else{
    app.get('/', (req, res) =>{
        res.send('API is running')
    })
}

const port = process.env.PORT 

app.listen(port, () => {console.log(`Server listening on port ${port}`)})
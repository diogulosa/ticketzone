import { Router } from 'express'
import Country from '../models/country-model.js'

const router = Router()

router.get('/',  async (req, res) => {
    try {
        const countries = await Country.find()
        if(countries){
            res.status(200).json({success: true, countries})
        }
    } catch (error) {
        res.status(400).json({success: false, error})
    }
    
    
})

router.get('/find', async (req, res) => {
    let {q} = req.query
    let docs = await Country.find()
    let results = []
    docs.find(element => {
        if (element.name.includes(q)) {
          results.push(element)
        }
      });
    //results = results.slice(0,10)
    if(results.length > 0){
        res.status(200).json({success: true, result: results})
    }else{
        res.status(400).json({success: false, message: "No results found."})
    }
})

router.post('/:name', async (req, res) => {
    const newCountry = new Country({'name': req.params.name})
    const doc = await newCountry.save()
    if(doc){
        res.status(201).json({success: true, country: doc})
    }
})

export default router
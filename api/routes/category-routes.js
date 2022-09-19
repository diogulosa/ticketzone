import { Router } from 'express'
import Category from '../models/category-model.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({success: true, categories: categories})
    } catch (error) {
        res.json({success: false, error})
    }
})

export default router
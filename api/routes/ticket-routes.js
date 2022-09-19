import { Router } from 'express'
const router = Router();

router.get('/validate/:id', (req, res) => {
    const ticketId = req.params.id
    res.json({validated: true, id: ticketId})
})

export default router
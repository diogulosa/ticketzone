import { Router } from 'express'
const router = Router();

router.post('/', (req, res) => {
  res.send('hi from checlout routes')
});

export default router;
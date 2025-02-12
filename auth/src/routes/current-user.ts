import express from 'express';
import { currentUser } from '@koraritickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    return res.send({currentUser: req.currentUser || null});
})
 
export { router as currentUserRouter };
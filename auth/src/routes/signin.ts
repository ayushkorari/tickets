import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '@koraritickets/common';
import { comparePasswords } from '../utils/hashing';
import { validateRequest } from '@koraritickets/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin',[
    body('email')
        .isEmail()
        .withMessage('Not a valid email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Please provide a password')
], validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});

    if(!existingUser) {
        throw new BadRequestError('Invalid Credentials');
    }
    const result = await comparePasswords(password, existingUser.password );
    if(!result) {
        throw new BadRequestError('Invalid Credentials');
    }

    const userJwt = jwt.sign(
        {id: existingUser.id, email: existingUser.email},
        process.env.JWT_KEY!
    )
    req.session = {
        jwt: userJwt
    };

    res.send(existingUser);
})

export { router as signinRouter };
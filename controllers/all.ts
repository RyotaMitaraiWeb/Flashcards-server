import express, { NextFunction, Request, Response } from 'express'
import jwtService from '../services/jwt.js';
const router = express.Router();

router.get('/user', jwtService.verifyToken, (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        msg: 'Success',
    });
});

export { router }
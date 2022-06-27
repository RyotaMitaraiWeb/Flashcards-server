import express, { Request, Response, NextFunction } from 'express'
const router = express.Router();

router.post('/register', (req: Request, _res: Response, _next: NextFunction) => {
});

export { router }
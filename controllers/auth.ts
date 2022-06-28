import express, { Request, Response, NextFunction } from 'express'
import authService from '../services/auth';
const router = express.Router();

router.post('/register', async (req: Request, res: Response, _next: NextFunction) => {
    const { username, email, password }: any = req.body;
    try {
        const accessToken = await authService.register(username, password, email);
        res.cookie('accessToken', accessToken);
        res.status(201).json({ accessToken });
    } catch(err) {
        res.status(400).json({
            msg: 'Could not register',
        });
        res.end();
    }
});

export { router }
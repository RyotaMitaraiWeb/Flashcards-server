import express, { Request, Response } from 'express'
import authService from '../services/auth.js';
import jwtService from '../services/jwt.js';
const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const { username, email, password }: any = req.body;
        const accessToken = await authService.register(username, password, email);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
        });
        res.status(201).json({ accessToken });
        console.log('success');
    } catch (err: any) {
        console.log(err.stack);
        res.status(401).json({
            msg: err.msg,
        });
        
        res.end();
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const username: string = req.body.username.trim();
        const password: string = req.body.password.trim();

        const accessToken: string = await authService.login(username, password);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
        });
        res.status(200).json({ accessToken });
        res.end();
    } catch (err: any) {
        console.log(err.stack);
        res.status(401).json({
            msg: 'Could not login'
        });
        res.end();
    }
});

router.get('/logout', jwtService.blacklistToken ,(_req: Express.Request, res: Response) => {
    res.cookie('accessToken', '', {
        httpOnly: true,
        secure: false,
    });
    res.status(204).json({});
    res.end();
});

export { router }
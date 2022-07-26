import express, { Request, Response } from 'express'
import authService from '../services/auth.js';
import userService from '../services/user.js';
import jwtService from '../services/jwt.js';
import mapErrors from '../util/errorMapper.js';
const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password }: any = req.body;
        const user = await authService.register(username, password, email);
        const accessToken: string = jwtService.generateToken(user);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
        });
        res.status(201).json({
            id: user._id,
            username: user.username,
        });
    } catch (err: any) {
        const errors = mapErrors(err);
        res.status(401).json({
            errors
        });

        res.end();
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const username: string = req.body.username.trim();
        const password: string = req.body.password.trim();

        const user = await authService.login(username, password);
        const accessToken: string = jwtService.generateToken(user);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
        })
        .status(200)
        .json({
            id: user._id,
            username: user.username,
        });

        res.end();
    } catch (err: any) {
        res.status(401).json({
            msg: 'Неуспешен вход!'
        });

        res.end();
    }
});

router.get('/isLogged', jwtService.verifyToken, (req: Express.Request, res: Response) => {
    const token: any = req.accessToken;
    res.status(200).json({
        username: token.username,
        id: token._id,
    });

    res.end();
});

router.get('/logout', jwtService.verifyToken, jwtService.blacklistToken, (_req: Express.Request, res: Response) => {
    res.cookie('accessToken', '', {
        httpOnly: true,
        secure: false,
    });

    res.status(204).json({});
    res.end();
});

router.post('/exists', async (req: Request, res: Response) => {
    const username: string = req.body.username?.trim();
    const email: string = req.body.email?.trim();
    let error: string = '';
    const usernameIsFree = await userService.findUserByUsername(username);
    const emailIsFree = await userService.findUserByEmail(email);

    if (username && usernameIsFree !== null) {
        error = 'Потребителското име е заето';
    } else if (email && emailIsFree !== null) {
        error = 'Имейлът е зает'
    }

    const status: number = error !== '' ? 200 : 404;
    res.status(status).json({
        error
    });

    res.end();
});

export { router }
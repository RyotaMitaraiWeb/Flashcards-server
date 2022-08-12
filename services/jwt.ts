import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

const blacklist: Set<string> = new Set();
const secret: string = process.env.SECRET || '12mgo203gokwasA2O';

const jwt = jsonwebtoken;

function generateToken(user: IUser): string {
    const payload: {} = {
        username: user.username,
        _id: user._id,
    };

    const token: string = jwt.sign(payload, secret, {
        expiresIn: '60 days',
    });
    
    return token;
}

function verifyToken(req: Express.Request, res: Response, next: NextFunction): void {
    try {
        const token: string = req.cookies.accessToken;
        if (blacklist.has(token)) {
            throw new Error();
        }

        const accessToken: IToken = <IToken>jwt.verify(token, secret);
        req.accessToken = accessToken;
        next();
    } catch (err: any) {
        res.cookie('accessToken', '', {
            secure: false,
            httpOnly: true,
        });
        res.status(403).json({
            msg: 'Invalid token',
        });

        res.end();
    }
}

function blacklistToken(req: Request, _res: Response, next: NextFunction): void {
    const token: string = req.cookies.accessToken;
    blacklist.add(token);
    next();
}

const jwtService = {
    generateToken,
    verifyToken,
    blacklistToken,
};

export default jwtService;
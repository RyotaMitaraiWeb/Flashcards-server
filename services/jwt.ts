import { Response, NextFunction } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

const blacklist: Set<string> = new Set();

const jwt = jsonwebtoken;

function generateToken(user: any): string {
    const payload: {} = {
        username: user.username,
        _id: user._id,
    };

    const token: string = jwt.sign(payload, '12mgo203gokwasA2O', {
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
        const accessToken: string | JwtPayload = jwt.verify(token, '12mgo203gokwasA2O');
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

function blacklistToken(req: Express.Request, _res: Response, next: NextFunction) {
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
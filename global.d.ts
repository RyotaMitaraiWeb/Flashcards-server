import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { Document } from 'mongoose';

export { };

declare global {
    /**
     * interface that holds user: Document and token: string properties
     */
    interface IResult {
        user: Document,
        token: string,
    }

    namespace Express {
        interface Request {
            cookies: {
                accessToken: string,
            },
            accessToken: string | JwtPayload,
        }
    }
}
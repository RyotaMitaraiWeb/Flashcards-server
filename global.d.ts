import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import mongoose from 'mongoose';

export { };

declare global {
    /**
     * interface that holds user: Document and token: string properties
     */
    interface IResult {
        user: Document,
        token: string,
    }

    interface IDeck extends mongoose.Document {
        title: string,
        description: string,
        author: mongoose.Types.ObjectId,
        flashcards: IFlashcard[],
    }

    interface IFlashcard extends mongoose.Document {
        front: string,
        back: string,
    }

    interface IToken extends JwtPayload {
        username: string,
        _id: string,
    }

    namespace Express {
        interface Request {
            cookies: {
                accessToken: string,
            },
            accessToken: IToken,
            isAuthor: boolean,
            deck: IDeck,
            hasBookmarked: boolean,
        }
    }
}
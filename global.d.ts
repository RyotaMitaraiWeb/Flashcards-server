import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import mongoose from 'mongoose';

export { };

declare global {
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

    interface IUser extends mongoose.Document {
        username: string,
        _id: string,
        password: string,
        email: string,
        decks: IDeck[],
        theme: 'light' | 'dark',
        colorTheme: 'purple' | 'blue' | 'brown' | 'green' | 'pink',
        animation: 'vertical' | 'horizontal',

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
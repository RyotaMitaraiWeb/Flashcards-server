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
}
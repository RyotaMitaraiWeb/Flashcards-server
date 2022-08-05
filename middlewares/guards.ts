import Express, { NextFunction } from "express";
import flashcardService from "../services/flashcards.js";

async function isAuthor(req: Express.Request, res: Express.Response, next: NextFunction): Promise<void> {
    const token: IToken = <IToken> req.accessToken;
    console.log(token);
    
    const userId: string = token._id;
    const postId: string = req.params.id;
    try {
        const deck: IDeck = await flashcardService.getDeck(postId);
        const authorId: string = deck._id.toString();

        req.isAuthor = authorId === userId;
        req.deck = deck;
        next();
    } catch {
        res.status(404).end();
    }
}

export {
    isAuthor
}
import { Request, Response, NextFunction } from "express";
import flashcardService from "../services/flashcards.js";

async function isAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token: IToken = <IToken> req.accessToken;
    
    const userId: string = token._id;
    
    const postId: string = req.params.id;
    try {
        const deck: IDeck = await flashcardService.getDeck(postId);
        
        const authorId: string = deck.author.toString();

        req.isAuthor = authorId === userId;
        req.deck = deck;
        next();
    } catch {
        res.status(404).end();
    }
}

async function isAuthorized(req: Request, res: Response, next: NextFunction): Promise<void> {    
    const isAuthor: boolean = req.isAuthor;
    
    if (!isAuthor) {
        res.status(403).json('Unauthorized').end();
    } else {
        next();
    }
}

export {
    isAuthor,
    isAuthorized
}
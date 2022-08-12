import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import userService from "../services/user.js";


async function hasBookmarked(req: Request, res: Response, next: NextFunction) {
    try {
        const token: IToken = req.accessToken;
        const userId: string = token._id;
        const deckId = req.params.id;
        
        const user: IUser = await userService.findUserById(userId);
        
        const decks: string[] = user.decks.map((id: Types.ObjectId) => id.toString());
        req.hasBookmarked = decks.includes(deckId);        
        next();
    } catch (err) {
        res.status(404).json('Тестето не съществува').end();
    }
}

export { hasBookmarked }
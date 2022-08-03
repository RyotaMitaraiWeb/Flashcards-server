import Express, { Response } from 'express'
import flashcardService from '../services/flashcards.js';
import jwtService from '../services/jwt.js';
import mapErrors from '../util/errorMapper.js';
import { router } from './auth.js';

router.get('/saved', jwtService.verifyToken, async (_req: Express.Request, res: Response) => {
    res.status(200).json([
        {
            title: 'War',
            author: 'Ryota',
            authorId: '15',
            date: '02-02-2022',
            id: 1,
        },
        {
            title: 'Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem ',
            author: 'admin',
            authorId: '112',
            date: '04-06-2050',
            id: 2,
        }
    ]);

    res.end();
});

router.post('/flashcard/create', jwtService.verifyToken, async (req: Express.Request, res: Response) => {
    let deck: IDeck | null = null;
    let flashcards: IFlashcard[] = [];
    
    try {
        flashcards = await Promise.all(req.body.flashcards.map(async (f: any) => await flashcardService.createFlashcard(f)));
    } catch (err) {
        const errors: string[] = mapErrors(err);
        res.status(403).json(errors).end();
    }

    try {
        deck = await flashcardService.createDeck(req, flashcards);
        res.status(201).json(deck._id).end();
    } catch (err) {
        const errors: string[] = mapErrors(err);
        console.log(errors);
        res.status(403).json(errors).end();
    }
});

export { router }
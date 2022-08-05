import Express, { Response } from 'express'
// import { isAuthor } from '../middlewares/guards.js';
import flashcardService from '../services/flashcards.js';
import jwtService from '../services/jwt.js';
import mapErrors from '../util/errorMapper.js';
import { router } from './auth.js';

router.get('/flashcard/saved', jwtService.verifyToken, async (req: Express.Request, res: Response) => {
    try {
        const id: string = req.accessToken._id;        
        const decks: IDeck[] = await flashcardService.getDecks(id)
        
        res.status(200).json(decks).end();
    } catch (err) {
        const errors = mapErrors(err);
        res.status(404).json(errors).end();
    }
});

router.get('/flashcard/:id', jwtService.verifyToken, async (req: Express.Request, res: Response) => {
    const id: string = req.params.id;
    const deck = await flashcardService.getDeck(id);
    const flashcards: IFlashcard[] = await flashcardService.getFlashcards(deck);
    res.status(200).json({
        deck,
        flashcards,
    }).end();
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
        res.status(403).json(errors).end();
    }
});

export { router }
import { Request, Response } from 'express'
import { isAuthor, isAuthorized } from '../middlewares/guards.js';
import flashcardService from '../services/flashcards.js';
import jwtService from '../services/jwt.js';
import mapErrors from '../util/errorMapper.js';
import { router } from './auth.js';

router.get('/flashcard/saved', jwtService.verifyToken, async (req: Request, res: Response) => {
    try {
        const id: string = req.accessToken._id;
        // console.log();
        
        const decks: IDeck[] = await flashcardService.getDecks(id)

        res.status(200).json(decks).end();
    } catch (err) {
        const errors = mapErrors(err);
        res.status(404).json(errors).end();
    }
});

router.get('/flashcard/all', async (_req: Request, res: Response) => {
    try {
        const decks: IDeck[] = await flashcardService.getAllDecks();
        res.status(200).json(decks).end();
    } catch (err) {
        const errors = mapErrors(err);
        res.status(404).json(errors).end();
    }
});

router.get('/flashcard/:id', async (req: Request, res: Response) => {
    try {        
        const id: string = req.params.id;        
        const deck = await flashcardService.getDeck(id);
        
        const flashcards: IFlashcard[] = await flashcardService.getFlashcards(deck);
        res.status(200).json({
            deck,
            flashcards,
        }).end();


    } catch (err) {
        const errors = mapErrors(err);
        res.status(404).json(errors).end();
    }
});

router.post('/flashcard/create', jwtService.verifyToken, async (req: Request, res: Response) => {
    let deck: IDeck | null = null;
    let flashcards: IFlashcard[] = [];

    try {
        flashcards = await Promise.all(req.body.flashcards.map(async (f: any) => await flashcardService.createFlashcard(f)));
        try {
            deck = await flashcardService.createDeck(req, flashcards);
            res.status(201).json(deck._id).end();
        } catch (err) {
            const errors: string[] = mapErrors(err);
            res.status(400).json(errors).end();
        }
    } catch (err) {
        const errors: string[] = mapErrors(err);
        res.status(400).json(errors).end();
    }
});

router.put('/flashcard/:id/edit', jwtService.verifyToken, isAuthor, isAuthorized, async (req: Request, res: Response) => {

    try {
        const id: string = req.params.id;
        const flashcards: IFlashcard[] = req.body.flashcards;
        const newFlashcards: IFlashcard[] = await Promise.all(flashcards.map(async (f: any) => await flashcardService.createFlashcard(f)));
        const newDeck: IDeck = await flashcardService.editDeck(req, id, newFlashcards);
        res.status(202).json(newDeck._id).end();

    } catch (err) {        
        const errors = mapErrors(err);
        console.log(errors);
        

        res.status(400).json(errors).end();
    }
});

router.delete('/flashcard/:id/delete', jwtService.verifyToken, isAuthor, isAuthorized, async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const deck: IDeck = await flashcardService.deleteDeck(id);
        res.status(202).json(deck._id).end();
    } catch (err) {
        const errors = mapErrors(err);
        res.status(400).json(errors).end();
    }
});

export { router }
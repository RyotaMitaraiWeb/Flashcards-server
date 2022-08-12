import { __awaiter } from "tslib";
import { hasBookmarked } from '../middlewares/bookmark.js';
import { isAuthor, isAuthorized } from '../middlewares/guards.js';
import flashcardService from '../services/flashcards.js';
import jwtService from '../services/jwt.js';
import userService from '../services/user.js';
import mapErrors from '../util/errorMapper.js';
import { router } from './auth.js';
router.get('/flashcard/saved', jwtService.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.accessToken._id;
        const decks = yield flashcardService.getDecks(id);
        res.status(200).json(decks).end();
    }
    catch (err) {
        const errors = mapErrors(err);
        res.status(404).json(errors).end();
    }
}));
router.get('/flashcard/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.query.title;
        const decks = yield flashcardService.getDecksByTitle(title);
        res.status(200).json(decks).end();
    }
    catch (err) {
        const errors = mapErrors(err);
        res.status(400).json(errors).end();
    }
}));
router.get('/flashcard/random', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deck = yield flashcardService.getRandomDeck();
    if (deck === undefined) {
        res.status(404).json('Няма тестета!');
    }
    else {
        res.status(200).json(deck._id);
    }
}));
router.get('/flashcard/all', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decks = yield flashcardService.getAllDecks();
        res.status(200).json(decks).end();
    }
    catch (err) {
        const errors = mapErrors(err);
        res.status(404).json(errors).end();
    }
}));
router.get('/flashcard/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deck = yield flashcardService.getDeck(id);
        const flashcards = yield flashcardService.getFlashcards(deck);
        res.status(200).json({
            deck,
            flashcards,
        }).end();
    }
    catch (err) {
        const errors = mapErrors(err);
        res.status(404).json(errors).end();
    }
}));
router.get('/flashcard/:id/hasBookmarked', jwtService.verifyToken, isAuthor, hasBookmarked, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userId = req.accessToken._id;
    const user = yield userService.findUserById(userId);
    const decks = user.decks.map((d) => d.toString());
    if (decks.includes(id)) {
        res.status(200).end();
    }
    else {
        res.status(404).end();
    }
}));
router.post('/flashcard/:id/bookmark', jwtService.verifyToken, isAuthor, hasBookmarked, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userId = req.accessToken._id;
    const hasBookmarked = req.hasBookmarked;
    try {
        if (!req.isAuthor) {
            if (!hasBookmarked) {
                yield flashcardService.bookMarkDeck(userId, id);
                res.status(201).json('Added successfully').end;
            }
            else {
                yield flashcardService.unbookMarkDeck(userId, id);
                res.status(202).json('Removed successfully').end();
            }
        }
        else {
            res.status(403).json('Cannot bookmark').end();
        }
    }
    catch (err) {
        const errors = mapErrors(err);
        res.status(404).json(errors).end();
    }
}));
router.post('/flashcard/create', jwtService.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deck = null;
    let flashcards = [];
    try {
        flashcards = yield Promise.all(req.body.flashcards.map((f) => __awaiter(void 0, void 0, void 0, function* () { return yield flashcardService.createFlashcard(f); })));
        try {
            deck = yield flashcardService.createDeck(req, flashcards);
            res.status(201).json(deck._id).end();
        }
        catch (err) {
            const errors = mapErrors(err);
            res.status(400).json(errors).end();
        }
    }
    catch (err) {
        const errors = mapErrors(err);
        res.status(400).json(errors).end();
    }
}));
router.put('/flashcard/:id/edit', jwtService.verifyToken, isAuthor, isAuthorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const flashcards = req.body.flashcards;
        const newFlashcards = yield Promise.all(flashcards.map((f) => __awaiter(void 0, void 0, void 0, function* () { return yield flashcardService.createFlashcard(f); })));
        const newDeck = yield flashcardService.editDeck(req, id, newFlashcards);
        res.status(202).json(newDeck._id).end();
    }
    catch (err) {
        const errors = mapErrors(err);
        console.log(errors);
        res.status(400).json(errors).end();
    }
}));
router.delete('/flashcard/:id/delete', jwtService.verifyToken, isAuthor, isAuthorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deck = yield flashcardService.deleteDeck(id);
        res.status(202).json(deck._id).end();
    }
    catch (err) {
        const errors = mapErrors(err);
        res.status(400).json(errors).end();
    }
}));
export { router };

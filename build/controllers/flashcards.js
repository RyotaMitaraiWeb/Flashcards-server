import { __awaiter } from "tslib";
// import { isAuthor } from '../middlewares/guards.js';
import flashcardService from '../services/flashcards.js';
import jwtService from '../services/jwt.js';
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
router.get('/flashcard/:id', jwtService.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deck = yield flashcardService.getDeck(id);
    const flashcards = yield flashcardService.getFlashcards(deck);
    res.status(200).json({
        deck,
        flashcards,
    }).end();
}));
router.post('/flashcard/create', jwtService.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deck = null;
    let flashcards = [];
    try {
        flashcards = yield Promise.all(req.body.flashcards.map((f) => __awaiter(void 0, void 0, void 0, function* () { return yield flashcardService.createFlashcard(f); })));
    }
    catch (err) {
        const errors = mapErrors(err);
        res.status(403).json(errors).end();
    }
    try {
        deck = yield flashcardService.createDeck(req, flashcards);
        res.status(201).json(deck._id).end();
    }
    catch (err) {
        const errors = mapErrors(err);
        res.status(403).json(errors).end();
    }
}));
export { router };

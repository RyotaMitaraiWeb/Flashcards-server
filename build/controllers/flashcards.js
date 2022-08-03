import { __awaiter } from "tslib";
import flashcardService from '../services/flashcards.js';
import jwtService from '../services/jwt.js';
import mapErrors from '../util/errorMapper.js';
import { router } from './auth.js';
router.get('/saved', jwtService.verifyToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log(errors);
        res.status(403).json(errors).end();
    }
}));
export { router };

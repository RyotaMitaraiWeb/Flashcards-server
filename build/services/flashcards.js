import { __awaiter } from "tslib";
// import userService from "./user";
import Deck from '../models/Deck.js';
import User from '../models/User.js';
import Flashcard from '../models/Flashcard.js';
function getDeck(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deck = yield Deck.findById(id);
        return deck;
    });
}
function getDecks(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findById(userId);
        const decks = yield Promise.all(user.decks.map((d) => __awaiter(this, void 0, void 0, function* () {
            return yield getDeck(d);
        })));
        const filteredDecks = decks.filter((d) => d !== null);
        return filteredDecks;
    });
}
function getFlashcard(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const flashcard = yield Flashcard.findById(id);
        return flashcard;
    });
}
function getFlashcards(deck) {
    return __awaiter(this, void 0, void 0, function* () {
        const flashcards = yield Promise.all(deck.flashcards.map((f) => __awaiter(this, void 0, void 0, function* () {
            return yield getFlashcard(f._id);
        })));
        return flashcards;
    });
}
function createDeck(data, flashcards) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = data.body.title;
        const description = data.body.description;
        const user = data.accessToken;
        const author = user._id;
        const authorUsername = user.username;
        const payload = {
            title,
            description,
            author,
            authorUsername,
            flashcards,
        };
        const deck = new Deck(payload);
        yield deck.save();
        yield User.findByIdAndUpdate(author, {
            $push: {
                decks: deck._id
            }
        });
        return deck;
    });
}
function createFlashcard(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const front = data.front.trim();
        const back = data.back.trim();
        const flashcard = new Flashcard({
            front,
            back
        });
        yield flashcard.save();
        return flashcard;
    });
}
function editDeck(data, deckId, flashcards) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = data.body.title;
        const description = data.body.description;
        const user = data.accessToken;
        const author = user._id;
        const authorUsername = user.username;
        const payload = {
            title,
            description,
            author,
            authorUsername,
            flashcards,
        };
        const deck = yield Deck.findByIdAndUpdate(deckId, payload, {
            runValidators: true,
        });
        yield deck.save();
        //
        return deck;
    });
}
function editFlashcard(flashcard, id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        const newFlashcard = yield Flashcard.findByIdAndUpdate(id, {
            front: flashcard.front,
            back: flashcard.back,
        }, {
            runValidators: true
        });
        return newFlashcard;
    });
}
const flashcardService = {
    getDeck,
    getDecks,
    getFlashcard,
    getFlashcards,
    createDeck,
    createFlashcard,
    editDeck,
    editFlashcard,
};
export default flashcardService;

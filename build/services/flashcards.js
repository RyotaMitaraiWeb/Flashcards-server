import { __awaiter } from "tslib";
// import userService from "./user";
import Deck from '../models/Deck.js';
import Flashcard from '../models/Flashcard.js';
function createDeck(data, flashcards) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = data.body.title;
        const description = data.body.description;
        const user = data.accessToken;
        console.log(user);
        const author = user._id;
        const payload = {
            title,
            description,
            author,
            flashcards,
        };
        const deck = new Deck(payload);
        yield deck.save();
        return deck;
    });
}
function createFlashcard(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const front = data.front.content.trim();
        const back = data.back.content.trim();
        const flashcard = new Flashcard({
            front,
            back
        });
        yield flashcard.save();
        return flashcard;
    });
}
const flashcardService = {
    createDeck,
    createFlashcard
};
export default flashcardService;

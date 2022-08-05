import { __awaiter } from "tslib";
import flashcardService from "../services/flashcards.js";
function isAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.accessToken;
        const userId = token._id;
        const postId = req.params.id;
        try {
            const deck = yield flashcardService.getDeck(postId);
            const authorId = deck.author.toString();
            req.isAuthor = authorId === userId;
            req.deck = deck;
            next();
        }
        catch (_a) {
            res.status(404).end();
        }
    });
}
function isAuthorized(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAuthor = req.isAuthor;
        if (!isAuthor) {
            res.status(403).json('Unauthorized').end();
        }
        else {
            next();
        }
    });
}
export { isAuthor, isAuthorized };

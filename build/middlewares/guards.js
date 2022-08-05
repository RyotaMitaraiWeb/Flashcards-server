import { __awaiter } from "tslib";
import flashcardService from "../services/flashcards.js";
function isAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.accessToken;
        console.log(token);
        const userId = token._id;
        const postId = req.params.id;
        try {
            const deck = yield flashcardService.getDeck(postId);
            const authorId = deck._id.toString();
            req.isAuthor = authorId === userId;
            req.deck = deck;
            next();
        }
        catch (_a) {
            res.status(404).end();
        }
    });
}
export { isAuthor };

import { __awaiter } from "tslib";
import userService from "../services/user.js";
function hasBookmarked(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.accessToken;
            const userId = token._id;
            const deckId = req.params.id;
            const user = yield userService.findUserById(userId);
            const decks = user.decks.map((d) => d._id.toString());
            req.hasBookmarked = decks.includes(deckId);
            next();
        }
        catch (err) {
            res.status(404).json('Тестето не съществува').end();
        }
    });
}
export { hasBookmarked };

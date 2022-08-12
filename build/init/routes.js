import { __awaiter } from "tslib";
import { router as auth } from "../controllers/auth.js";
import { router as flashcards } from '../controllers/flashcards.js';
import { router as profile } from '../controllers/profile.js';
export default function configureRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(auth);
        app.use(flashcards);
        app.use(profile);
        app.get('/', (_req, res) => {
            res.json({
                status: 'good'
            });
        });
    });
}

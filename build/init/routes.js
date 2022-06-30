import { __awaiter } from "tslib";
import { router as auth } from "../controllers/auth.js";
import { router as all } from '../controllers/all.js';
export default function configureRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(auth);
        app.use(all);
    });
}

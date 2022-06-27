import { __awaiter } from "tslib";
import { router as auth } from "../controllers/auth.js";
export default function configureRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        // app.all('/', function (req: Request, res: Response, next: NextFunction) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
        //     next();
        // });
        app.use(auth);
    });
}

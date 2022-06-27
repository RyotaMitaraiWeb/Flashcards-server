import { __awaiter } from "tslib";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDB from './db';
import configureRoutes from './routes';
function start(app) {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv.config();
        const port = process.env.PORT || '5500';
        app.use(cookieParser(process.env.SECRET));
        yield connectToDB();
        yield configureRoutes(app);
        app.listen(port, () => {
            console.log('Listening on port ' + port);
        });
    });
}
export default start;

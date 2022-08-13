import { __awaiter } from "tslib";
import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDB from './db.js';
import configureRoutes from './routes.js';
import cors from 'cors';
function start(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(cookieParser());
        console.log(process.env.PORT);
        const port = process.env.PORT || 5500;
        app.use(express.json());
        app.use(cors({
            origin: '*',
            credentials: true,
        }));
        connectToDB();
        yield configureRoutes(app);
        app.listen(port, () => {
            console.log('Listening on port ' + port);
        });
    });
}
export default start;

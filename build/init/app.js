import { __awaiter } from "tslib";
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDB from './db.js';
import configureRoutes from './routes.js';
import cors from 'cors';
function start(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(cookieParser());
        dotenv.config();
        const port = process.env.PORT || '5500';
        app.use(express.json());
        app.use(cors({
            origin: ['http://localhost:3000', 'http://192.168.0.104:3000'],
            credentials: true,
        }));
        yield connectToDB();
        yield configureRoutes(app);
        app.listen(port, () => {
            console.log('Listening on port ' + port);
        });
    });
}
export default start;

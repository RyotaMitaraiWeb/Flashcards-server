import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import connectToDB from './db.js';
import configureRoutes from './routes.js';
import cors from 'cors';

async function start(app: Express): Promise<void> {
    app.use(cookieParser());
    console.log(process.env.PORT);

    const port = process.env.PORT || 5500;
    app.use(express.json());
    app.use(cors({
        origin: ['http://localhost:3000', 'http://192.168.0.104:3000', 'https://flashcards-da911.web.app/'],
        credentials: true,
    }));

    connectToDB();
    await configureRoutes(app);
    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });
}

export default start;
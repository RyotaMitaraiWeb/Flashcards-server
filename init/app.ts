import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import connectToDB from './db.js';
import configureRoutes from './routes.js';
import cors from 'cors';

async function start(app: Express): Promise<void> {
    app.use(cookieParser());
    console.log(process.env.PORT);

    const port: string | undefined = '5000';
    app.use(express.json());
    app.use(cors({
        origin: ['http://localhost:3000', 'http://192.168.0.104:3000'],
        credentials: true,
    }));

    await connectToDB();
    await configureRoutes(app);
    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });
}

export default start;
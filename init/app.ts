import express, { Express, json} from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDB from './db.js';
import configureRoutes from './routes.js';

import cors from 'cors';

async function start(app: Express): Promise<any> {
    dotenv.config();
    const port: string | undefined = process.env.PORT || '5500';
    app.use(express.json());
    app.use(cookieParser(process.env.SECRET));
    // app.use(urlencoded({ extended: false }));
    app.use(cors({
        origin: '*',
    }));

    await connectToDB();
    await configureRoutes(app);
    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });
}

export default start;
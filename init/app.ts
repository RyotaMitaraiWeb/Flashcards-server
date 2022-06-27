import { Express } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDB from './db';
import configureRoutes from './routes';

async function start(app: Express): Promise<any> {
    dotenv.config();
    const port: string | undefined = process.env.PORT || '5500';
    app.use(cookieParser(process.env.SECRET));

    await connectToDB();
    await configureRoutes(app);
    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });
}

export default start;
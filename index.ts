import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
const app: Express = express();

dotenv.config();

const port: string | undefined = process.env.PORT || '5500';

app.listen(port, () => {
    console.log('Listening on port ' + port); 
});
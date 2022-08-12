import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import start from './init/app.js';

dotenv.config();

const app: Express = express();

start(app);
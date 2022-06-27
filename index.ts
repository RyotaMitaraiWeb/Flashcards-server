import express, { Express } from 'express';
import start from './init/app.js';
const app: Express = express();

start(app);
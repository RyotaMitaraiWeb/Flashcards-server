import * as dotenv from 'dotenv';
import express from 'express';
import start from './init/app.js';
dotenv.config();
const app = express();
console.log('test');
start(app);

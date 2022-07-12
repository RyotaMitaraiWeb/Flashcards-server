import { Express } from "express";
import { router as auth } from "../controllers/auth.js";
import { router as all } from '../controllers/all.js';

export default async function configureRoutes(app: Express): Promise<void> {
    app.use(auth);
    app.use(all);
}
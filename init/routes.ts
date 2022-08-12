import { Express } from "express";
import { router as auth } from "../controllers/auth.js";
import { router as flashcards } from '../controllers/flashcards.js';
import { router as profile } from '../controllers/profile.js';

export default async function configureRoutes(app: Express): Promise<void> {
    app.use(auth);
    app.use(flashcards);
    app.use(profile);
    app.get('/', (_req, res) => {
        res.json({
            status: 'good'
        });
    })
}
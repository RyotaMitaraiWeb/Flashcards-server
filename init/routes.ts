import { Express } from "express";
import { router as auth } from "../controllers/auth.js";

export default async function configureRoutes(app: Express): Promise<any> {
    app.use(auth);
}
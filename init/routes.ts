import { Express, Request, Response, NextFunction } from "express";
import { router as auth } from "../controllers/auth.js";

export default async function configureRoutes(app: Express): Promise<any> {
    // app.all('/', function (req: Request, res: Response, next: NextFunction) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     next();
    // });
    app.use(auth);
}
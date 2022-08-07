import { __awaiter } from "tslib";
import express from 'express';
import userService from '../services/user.js';
import jwtService from '../services/jwt.js';
import mapErrors from '../util/errorMapper.js';
import User from '../models/User.js';
const router = express.Router();
router.get('/profile', jwtService.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.accessToken._id;
        const user = yield userService.findUserById(id);
        res.status(200).json({
            theme: user.theme,
            colorTheme: user.colorTheme,
            animation: user.animation,
        }).end();
    }
    catch (err) {
        res.status(404).json('Потребителят не съществува').end();
    }
}));
router.put('/profile', jwtService.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.accessToken._id;
        const { theme, colorTheme, animation } = req.body;
        yield User.findByIdAndUpdate(id, {
            theme,
            colorTheme,
            animation
        });
        res.status(202).json({
            theme, colorTheme, animation
        }).end();
    }
    catch (err) {
        const errors = mapErrors(err);
        res.status(400).json(errors).end();
    }
}));
export { router };

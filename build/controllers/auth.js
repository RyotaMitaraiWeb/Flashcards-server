import { __awaiter } from "tslib";
import express from 'express';
import authService from '../services/auth';
const router = express.Router();
router.post('/register', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const accessToken = yield authService.register(username, password, email);
        res.cookie('accessToken', accessToken);
        res.status(201).json({ accessToken });
    }
    catch (err) {
        res.status(400).json({
            msg: 'Could not register',
        });
        res.end();
    }
}));
export { router };

import { __awaiter } from "tslib";
import express from 'express';
import authService from '../services/auth.js';
import jwtService from '../services/jwt.js';
const router = express.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { username, email, password } = req.body;
        const accessToken = yield authService.register(username, password, email);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        });
        res.status(201).json({ accessToken });
        console.log('success');
    }
    catch (err) {
        console.log(err.stack);
        res.status(401).json({
            msg: err.msg,
        });
        res.end();
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        const accessToken = yield authService.login(username, password);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        });
        res.status(200).json({ accessToken });
        res.end();
    }
    catch (err) {
        console.log(err.stack);
        res.status(401).json({
            msg: 'Could not login'
        });
        res.end();
    }
}));
router.get('/logout', jwtService.blacklistToken, (_req, res) => {
    res.cookie('accessToken', '');
    res.status(204).json({});
    res.end();
});
export { router };

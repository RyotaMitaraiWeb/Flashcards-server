import express from 'express';
import jwtService from '../services/jwt.js';
const router = express.Router();
router.get('/user', jwtService.verifyToken, (_req, res, _next) => {
    res.status(200).json({
        msg: 'Success',
    });
});
export { router };

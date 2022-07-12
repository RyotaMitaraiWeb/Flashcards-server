import { __awaiter } from "tslib";
import User from '../models/User.js';
import jwtService from './jwt.js';
import bcrypt from 'bcrypt';
import userService from './user.js';
function register(username, password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new User({
            username,
            password,
            email,
        });
        yield user.save();
        const token = jwtService.generateToken(user);
        return token;
    });
}
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userService.findUserByUsername(username);
        if (!user) {
            throw new Error('Грешно потребителско име или парола');
        }
        const comparison = yield bcrypt.compare(password, user.password);
        if (!comparison) {
            throw new Error('Грешно потребителско име или парола');
        }
        return user;
    });
}
const authService = {
    register,
    login,
};
export default authService;

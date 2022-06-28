import { __awaiter } from "tslib";
import User from '../models/User';
import jwtService from './jwt';
function register(username, password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new User({
            username,
            password,
            email,
        });
        const token = jwtService.generateToken(user);
        yield user.save();
        return token;
    });
}
const authService = {
    register,
};
export default authService;

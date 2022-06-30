import { __awaiter } from "tslib";
import User from "../models/User.js";
function findUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne({ username });
        return user;
    });
}
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne({ email });
        return user;
    });
}
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findById(id);
        return user;
    });
}
const userService = {
    findUserByEmail,
    findUserById,
    findUserByUsername,
};
export default userService;

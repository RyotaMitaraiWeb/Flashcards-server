import { __awaiter } from "tslib";
import mongoose from "mongoose";
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashcards';
mongoose.set('runValidators', true);
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose.set("useNewUrlParser", true);
        yield mongoose.connect(url);
        console.log('connected to DB');
    });
}
export default connectToDB;

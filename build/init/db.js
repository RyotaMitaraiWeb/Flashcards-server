import { __awaiter } from "tslib";
import mongoose from "mongoose";
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashcards';
        mongoose.set('runValidators', true);
        yield mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to DB');
    });
}
export default connectToDB;

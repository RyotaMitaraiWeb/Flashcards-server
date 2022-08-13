import mongoose from "mongoose";
function connectToDB() {
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashcards';
    mongoose.set('runValidators', true);
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('DB connected');
    });
    // console.log('connected to DB');
}
export default connectToDB;

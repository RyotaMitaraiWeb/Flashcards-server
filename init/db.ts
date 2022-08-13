import mongoose from "mongoose";

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashcards';

mongoose.set('runValidators', true);

async function connectToDB(): Promise<void> {
    mongoose.set("useNewUrlParser", true);
    await mongoose.connect(url);

    console.log('connected to DB');
}

export default connectToDB;
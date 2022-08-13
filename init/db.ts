import mongoose from "mongoose";

async function connectToDB(): Promise<void> {
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashcards';

    mongoose.set('runValidators', true);
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('connected to DB');
}

export default connectToDB;
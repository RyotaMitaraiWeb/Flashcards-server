import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/flashcards';

mongoose.set('runValidators', true);

async function connectToDB(): Promise<void> {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('connected to DB');
}

export default connectToDB;
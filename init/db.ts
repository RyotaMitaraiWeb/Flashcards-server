import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/flashcards';

async function connectToDB(): Promise<any> {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('connected to DB');
}

export default connectToDB;
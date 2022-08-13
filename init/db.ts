import mongoose from "mongoose";

const url = 'mongodb+srv://prod:prod-key-123456@flashcards.f2qklxm.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('runValidators', true);

async function connectToDB(): Promise<void> {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('connected to DB');
}

export default connectToDB;
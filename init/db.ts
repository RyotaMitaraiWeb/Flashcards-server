import mongoose from "mongoose";

function connectToDB(): void {
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashcards';

    mongoose.set('runValidators', true);
    mongoose.connect(url).then(() => {
        console.log('DB connected');
        
    });

    // console.log('connected to DB');
}

export default connectToDB;
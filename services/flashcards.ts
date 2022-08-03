import { Request } from 'express';
// import userService from "./user";
import Deck from '../models/Deck.js';
import Flashcard from '../models/Flashcard.js';


async function createDeck(data: Request, flashcards: IFlashcard[]): Promise<IDeck> {
    const title: string = data.body.title;
    const description: string = data.body.description;
    const user: any = data.accessToken;
    console.log(user);
    const author: string = user._id;

    const payload = {
        title,
        description,
        author,
        flashcards,
    };

    const deck: IDeck = <IDeck>new Deck(payload);
    await deck.save();

    return deck;
}

async function createFlashcard(data: any): Promise<IFlashcard> {
    const front: string = data.front.content.trim();
    const back: string = data.back.content.trim();

    const flashcard: IFlashcard = <IFlashcard>new Flashcard({
        front,
        back
    });

    await flashcard.save();
    return flashcard;
}

const flashcardService = {
    createDeck,
    createFlashcard
};

export default flashcardService;
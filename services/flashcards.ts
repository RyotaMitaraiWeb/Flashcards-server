import { Request } from 'express';
import Deck from '../models/Deck.js';
import User from '../models/User.js';
import Flashcard from '../models/Flashcard.js';

async function getDeck(id: string): Promise<IDeck> {
    const deck = <IDeck>await Deck.findById(id);
    return deck;
}

async function getDecksByTitle(title: string): Promise<IDeck[]> {
    const decks: IDeck[] = <IDeck[]> await Deck.find({
        title: new RegExp(title, 'i')
    });

    return decks;
}

async function getRandomDeck(): Promise<IDeck> {
    const decks: IDeck[] = await getAllDecks();
    const length: number = decks.length;
    const random: number = Math.floor(Math.random() * length);
    return decks[random];
}

async function getDecks(userId: string): Promise<IDeck[]> {
    const user: IUser = <IUser>await User.findById(userId);
    const decks: IDeck[] = await Promise.all(user.decks.map(async (d: IDeck) => {
        return await getDeck(d._id);
    }));

    const filteredDecks: IDeck[] = decks.filter((d: IDeck) => d !== null).reverse();
    return filteredDecks;
}

async function getAllDecks(): Promise<IDeck[]> {
    const decks: IDeck[] = <IDeck[]>await Deck.find({});
    return decks;
}

async function bookMarkDeck(userId: string, deckId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
        $push: {
            decks: deckId,
        }
    });
}

async function unbookMarkDeck(userId: string, deckId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
        $pull: {
            decks: deckId,
        }
    });
}

async function getFlashcard(id: string): Promise<IFlashcard> {
    const flashcard = <IFlashcard>await Flashcard.findById(id);
    return flashcard;
}

async function getFlashcards(deck: IDeck): Promise<IFlashcard[]> {
    const flashcards: IFlashcard[] = await Promise.all(deck.flashcards.filter((f: IFlashcard) => f !== null).map(async (f: IFlashcard) => {
        return await getFlashcard(f._id);
    }));

    return flashcards
}

async function createDeck(data: Request, flashcards: IFlashcard[]): Promise<IDeck> {
    const title: string = data.body.title;
    const description: string = data.body.description;
    const user: IToken = data.accessToken;
    const author: string = user._id;
    const authorUsername: string = user.username;

    const payload = {
        title,
        description,
        author,
        authorUsername,
        flashcards,
    };

    const deck: IDeck = <IDeck>new Deck(payload);
    await deck.save();

    await User.findByIdAndUpdate(author, {
        $push: {
            decks: deck._id
        }
    });

    return deck;
}

async function createFlashcard(data: IFlashcard): Promise<IFlashcard> {
    const front: string = data.front.trim();
    const back: string = data.back.trim();

    const flashcard: IFlashcard = <IFlashcard>new Flashcard({
        front,
        back
    });

    await flashcard.save();
    return flashcard;
}

async function editDeck(data: Request, deckId: string, flashcards: IFlashcard[]) {
    const title: string = data.body.title;
    const description: string = data.body.description;
    const user: IToken = data.accessToken;

    const author: string = user._id;
    const authorUsername: string = user.username;

    const payload = {
        title,
        description,
        author,
        authorUsername,
        flashcards,
    };

    const deck: IDeck = <IDeck>await Deck.findByIdAndUpdate(deckId, payload, {
        runValidators: true,
    });

    await deck.save();
    //
    return deck;
}

async function deleteDeck(deckId: string): Promise<IDeck> {
    const deck: IDeck = <IDeck>await Deck.findByIdAndDelete(deckId).lean();
    return deck;
}

const flashcardService = {
    getDeck,
    getDecks,
    getDecksByTitle,
    getRandomDeck,
    getAllDecks,
    bookMarkDeck,
    unbookMarkDeck,
    getFlashcard,
    getFlashcards,
    createDeck,
    createFlashcard,
    editDeck,
    deleteDeck,
};

export default flashcardService;
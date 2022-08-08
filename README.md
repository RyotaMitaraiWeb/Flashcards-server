# Flashcard-server
A TypeScript + Express server application, designed to handle requests from the [Flashcards-client project](https://github.com/RyotaMitaraiWeb/Flashcards-client)

## Installation
To run the server, navigate to the root directory in your terminal and run:

```bash
npm install
npm start
```
The following should appear on the terminal
```bash
connected to DB
Listening on port {PORT}
```
With this, the server will be ready to handle requests

**Note:** you need MongoDB installed to run the project successfully.

The repository comes with a build; you do not need to compile the TypeScript code if all you want is to run the server (you need to compile it when making changes to the project, though).

## Application structure/folders

### Init
This foldder contains "configurations" of the application, such as the endpoints of the controllers, database boot, CORS configurations, and others

### Models
Contains the models used in the database. Note that all string values in the models are trimmed.

#### User
A user has the following properties:
- username (string)
- email (string)
- password (string) - hashed before saving it
- decks (an array of ``Deck`` objects, which the user has created or saved)
- animation (``vertical`` or ``horizontal``), default ``vertical``
- colorTheme (``purple``, ``blue``, ``green``, ``pink``, or ``brown``), default ``purple``
- theme (``light`` or ``dark``), default ``light``

#### Flashcard
A flashcard has the following properties
- front (string)
- back (string)

#### Deck
A deck has the following properties
- title (string)
- description (string)
- author (a ``User`` object)
- authorUsername (string)
- flashcards (an array of ``Flashcard`` objects)

In addition, the Deck schema automatically generates ``createdAt`` and ``updatedAt`` timestamps

### global.d.ts
A file that holds interfaces, which can be used anywhere in the app

#### IFlashcard
Interface that extends the ``mongoose.Document`` constructor, which has the following properties:
- front (string)
- back (string)

#### IDeck
Interface that extends the ``mongoose.Document`` constructor, which has the following properties:
- title (string)
- description (string)
- author (mongoose.Types.ObjectI),
- flashcards (an array of IFlashcard),

#### IToken
Interface that extends the ``jwtPayload`` interface. Typically used on the access token obtained from the request. Has the following properties:
- username (string)
- _id (string)

#### Request
This interface extends the allowed properties on the ``Express.Request`` interface, thus they can be accessed directly through the ``Request`` interface (however, you need to explicitly import it when you use it) and also set via the middlewares. This interface, on top of the properties it already provides, has the following properties:
- cookies
  - accessToken (string) - not to be confused with the top-level property ``accessToken``
- accessToken (IToken) - not to be confused with ``cookies.accessToken``
- isAuthor (boolean)
- deck (IDeck)
- hasBookmarked (boolean)

### util
#### mapErrors(err: any): any[]
An error mapper. You should pass the error object to the function when it's thrown. This mapper makes sure that all errors sent to the client are in the same format, regardless of whether they originate from mongoose validations or from custom error handling

### services
#### auth
This folder provides methods for registering and logging in users

##### login(username: string, password: string): Promise<any>
Checks whether the user's credentials match with the requested profile. If there's a mismatch, an error is thrown

#### register(username: string, password: string, email: string): Promise<any>
Tries to register the user. Validations are handled by the ``User`` schema, which will throw an error if the username/email already exists or one (or more) of them values does not pass validations

#### flashcards
This folder provides various methods for reading and manipulating flashcards and decks

##### getDeck(id: string): Promise<IDeck>
Attempts to retrieve a ``Deck`` with the passed id

##### getRandomDeck(): Promise<IDeck>
Takes an array of all decks and returns one of the elements at random

##### getDecks(userId: string): Promise<IDeck[]>
Retrieves the user with the passed id and retrieves their created/saved decks. In addition, it will filter out all ``null`` results (which are caused when the user saves a deck and the owner deletes it) and reverse it to match date of creation/saving

##### getAllDecks(): Promise<IDeck[]>
Retrieves all decks that exist in the database at the time of its calling

##### bookMarkDeck(userId: string, deckId: string): Promise<void>
Retrieves the user with the provided userId and inserts in their ``decks`` property the passed deck id

##### unbookMarkDeck(userId: string, deckId: string): Promise<void>
Retrieves the user with the provided userId and removes from their ``decks`` property the passed deck id

##### getFlashcard(id: string): Promise<IFlashcard>
Retrieves the ``Flashcard`` object with the provided id

##### getFlashcards(deck: IDeck): Promise<IFlashcard[]>
Retrieves all flashcards from the given deck. Uses the ``getFlashcard`` method. It also filters out all ``null`` flashcards before retrieving the rest.

##### createDeck: (data: Request, flashcards: IFlashcard[]): Promise<IDeck>
Retrieves data from the ``req`` object (passed as ``data`` parameter), creates a deck and returns the created deck. The data paramter must provide a title, description, userId, and the user's username. After this, the method will insert the flashcards array that is passed as the second argument and insert them in the payload before creating the deck.

The flashcard array must already consist of ``Flashcard`` objects; this method does not handle their transformation (instead, read below for the method that creates a flashcard)

##### createFlashcard(data: any): Promise<IFlashcard>
Accepts an object with properties ``front`` and ``back`` and creates a ``Flashcard`` object, which it then returns. This method can be called in a ``Promise.all`` iterator in order to create multiple flashcards for a single deck.

##### editDeck(data: Request, deckId: string, flashcards: IFlashcard[])
Works similarly to the ``createDeck`` method, but accepts a ``deckId`` argument, which is the deck that has to be edited. The flashcard array, like in the aforementioned method, must constist of ``Flashcard`` objects that were created elsewhere. Unlike the deck, the flashcards are not edited, but rather are remade (this is to account for if a user deletes a card in the edit), thus the edited deck will have a new set of ``Flashcard`` objects, even if their contents were not edited at all.

##### deleteDeck(deckId: string): Promise<IDeck>
Attempts to delete the deck with the given ``deckId`` and returns the deleted deck

### jwtService
This service provides methods for verifying and generating tokens

#### generateToken(user: any): string

Accepts an object with ``username`` and ``_id`` attributes, which is generally generated by login or register, then creates a token that it returns. The token has an expiration time of 60 days (two months).

#### verifyToken(req: Express.Request, res: Response, next: NextFunction): Promise<void>
This middleware method retrieves the ``accessToken`` from the request's cookie and attempts to verify (and decode) it into a token. The method throws an error if the token is invalid or if it's in the token blacklist (read below for more information), which results in the cookie being deleted on the client.

#### blacklistToken(req: Express.Request, _res: Response, next: NextFunction): void
This middleware method retrieves the ``accessToken`` from the request's cookie and puts it in the blacklist. When a user attempts to make an authorized request with a token in the blacklist, the ``verifyToken`` method will throw an error.

### user
This service provides methods for retrieving the user

#### findUserByUsername(username: string): Promise<Document | null>, findUserByEmail(email: string): Promise<Document | null>, findUserById(id: string): Promise<Document | null>
Retrieves a ``User`` object via the given attribute

## Middlewares
Those are methods that can be called between requests in order to attach properties to the request object or to authorize the request

### isAuthor(req: Request, res: Response, next: NextFunction): Promise<void>
This method takes the user and deck id from the request object. The method then retrieves the deck with the given id. If it doesn't exist, the method will return a ``404`` error and abort the request. Once the deck is retrieved, its authorId is stringified and compared to the userId. The method then attaches an ``isAuthor`` property to the request object that is either ``true`` or ``false``, then moves on to the next middleware.

**Note:** this method does not directly grant access to resources or actions; rather, it grants an indictator as to whether the user is the owner of the particular entry. Read below to see how to authorize a request

### isAuthorized(req: Request, res: Response, next: NextFunction): Promise<void>
This middleware takes the ``isAuthor`` property of the object. If it returns ``true``, the middleware grants access to the next middleware, otherwise, it returns a ``403`` error to the client and aborts the request

### hasBookmarked(req: Request, res: Response, next: NextFunction): Promise<void>
The method takes the id of the user that makes the request and the id of the endpoint of the request. The middleware tries to retrieve the deck associated with the deck id and stringifies all the ``ObjectId``s. Afterwards, the middleware will attach a ``hasBookmarked`` property on the request and move on to the next middleware.

**Note:** this middleware does not control whether the user can bookmark or not bookmark; this protection is handled by the bookmark controller.



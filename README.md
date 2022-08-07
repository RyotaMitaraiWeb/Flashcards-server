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
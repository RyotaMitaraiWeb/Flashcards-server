import dotenv from 'dotenv';
import express from 'express';
const app = express();
dotenv.config();
const port = process.env.PORT || '5500';
app.listen(port, () => {
    console.log('Listening on port ' + port);
});

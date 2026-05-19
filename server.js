require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3370;
const MONGODB = process.env.MONGODB_URI;

app.use(express.json());
app.use('/api/notes', notesRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Route introuvable' });
});

app.use(errorHandler);


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGODB);
    console.log("Connection attempt to MongoDB succeeded");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
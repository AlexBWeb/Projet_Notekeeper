const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3370;
const MONGODB = process.env.MONGODB_URI;

const Route = require('./routes/notes'); 

app.use(express.json());
app.use('/notes', Route);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGODB);
    console.log("Connection attempt to MongoDB succeeded");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
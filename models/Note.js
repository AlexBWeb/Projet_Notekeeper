const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    author: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);

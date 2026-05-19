const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Note = require('../models/Note');

// GET /api/notes
const getAllNotes = async (req, res) => {
    const notes = await Note.find();
    res.status(200).json(notes);
};

// GET /api/notes/:id
const getNoteById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Format d\'identifiant invalide' });
    }

    const note = await Note.findById(id);

    if (!note) {
        return res.status(404).json({ message: 'Note introuvable' });
    }

    res.status(200).json(note);
};

// POST /api/notes
const createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, tags, author } = req.body;
    const note = await Note.create({ title, content, tags, author });
    res.status(201).json(note);
};

// PUT /api/notes/:id
const updateNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Format d\'identifiant invalide' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!note) {
        return res.status(404).json({ message: 'Note introuvable' });
    }

    res.status(200).json(note);
};

// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Format d\'identifiant invalide' });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
        return res.status(404).json({ message: 'Note introuvable' });
    }

    res.status(200).json({ message: 'Note supprimée avec succès' });
};

module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote };

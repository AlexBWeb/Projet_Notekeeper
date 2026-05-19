const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} = require('../controllers/notesController');

const createValidators = [
    body('title').trim().notEmpty().withMessage('Le titre est obligatoire')
        .isLength({ min: 3, max: 100 }).withMessage('Le titre doit contenir entre 3 et 100 caractères'),
    body('content').trim().notEmpty().withMessage('Le contenu est obligatoire'),
    body('author').trim().notEmpty().withMessage('L\'auteur est obligatoire'),
    body('tags').optional().isArray().withMessage('Les tags doivent être un tableau'),
];

const updateValidators = [
    body('title').optional().trim()
        .isLength({ min: 3, max: 100 }).withMessage('Le titre doit contenir entre 3 et 100 caractères'),
    body('content').optional().trim().notEmpty().withMessage('Le contenu ne peut pas être vide'),
    body('author').optional().trim().notEmpty().withMessage('L\'auteur ne peut pas être vide'),
    body('tags').optional().isArray().withMessage('Les tags doivent être un tableau'),
];

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createValidators, createNote);
router.put('/:id', updateValidators, updateNote);
router.delete('/:id', deleteNote);

module.exports = router;

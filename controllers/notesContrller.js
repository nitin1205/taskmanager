const asyncHandler = require('express-async-handler');

const Note = require('../models/Note');

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean();

    if (!notes?.length) {
        return res.status(400).json({ message: 'No notes found' });
    }
    res.json(notes);
});

const createNewNote = asyncHandler(async (req, res) => {
    const { username, title, text } = req.body;

    if (!username || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' });
    };

    const duplicate = await Note.findOne({ title }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Note already assigned' });
    };

    
    const noteObject = { username, title, text };
    
    const note = await Note.create(noteObject);

    if (note) {
        res.status(201).json({ message: `New note ${title}} created` });
    } else {
        res.status(400).json({ message: 'Invalid data recieved' });
    }

});

const updateNote = asyncHandler(async (req, res) => {
    const { id, username, title, text, completed } = req.body;

    if (!id || !username || !title || !text || !completed) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(400).json({ message: 'Note not found' });
    }

    const duplicate = await Note.findOne({ title }).lean().exec();

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate title' });
    }

    note.username = username;
    note.title = username;
    note.text = text;
    note.completed = completed;

    const updatedNote = await note.save();

    res.json({ message: `${updatedNote.title} updated` });
});

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Note ID Required' });
    }

    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(400).json({ message: 'Note not found' });
    }

    const result = await note.deleteOne();

    const reply = `Username ${result.title} with ID ${result._id} has been deleted`;

    res.json(reply);

});


module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
}
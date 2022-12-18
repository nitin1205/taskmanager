const express = require('express');
const router = express.Router();
const notesController = require('../controllers/usersController');

router.route('/')
    .get(notesController.getAllUser)
    .post(notesController.createNewUser)
    .patch(notesController.updateUser)
    .delete(notesController.deleteUser)

module.exports = router;
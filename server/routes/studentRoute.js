const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

router.get('/', studentController.getAllStudents);

// Create a new student
router.post('/create', studentController.createStudent);

// Update a student
router.put('/update', studentController.updateStudent);

// Delete a student
router.delete('/delete/:id', studentController.deleteStudent);

module.exports = router;
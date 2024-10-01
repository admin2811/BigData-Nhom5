const express = require('express');
const scoreController = require('../controllers/scoreController');
const router = express.Router();

router.get('/', scoreController.getAllScores);

// Create a new score
router.post('/create', scoreController.createScore);

// Update a score
router.put('/update', scoreController.updateScore);

// Delete a score
router.delete('/delete/:id', scoreController.deleteScore);

module.exports = router;

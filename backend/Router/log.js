// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logController = require('../controllers/log');

// POST: Create a new log
router.post('/', logController.createLog);

// GET: Get all logs
router.get('/', logController.getAllLogs);

// GET: Get a log by ID
router.get('/:id', logController.getLogById);

// PUT: Update a log by ID
router.put('/:id', logController.editLog);

// DELETE: Delete a log by ID
router.delete('/:id', logController.deleteLog);

module.exports = router;

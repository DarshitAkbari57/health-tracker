const express = require('express');
const router = express.Router();
const logController = require('../controllers/log');

router.post('/', logController.createLog);

router.get('/', logController.getAllLogs);

router.get('/:id', logController.getLogById);

router.put('/:id', logController.editLog);

router.delete('/:id', logController.deleteLog);

module.exports = router;

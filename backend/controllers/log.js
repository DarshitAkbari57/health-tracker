const db = require('../models');
const logService = require('../services/log');

exports.createLog = async (req, res) => {
    try {
        const { userId, moodRating, anxietyLevel, sleepHours, sleepQuality, sleepDisturbances, physicalActivity, activityDuration, socialInteractions, stressLevel, symptoms, logDate } = req.body;

        if (!userId || !moodRating || !anxietyLevel || !sleepHours || !sleepQuality || !stressLevel || !logDate) {
            return res.status(400).json({ message: 'Required fields missing', error: 'Missing required fields' });
        }

        const existingLog = await db.Log.findOne({
            where: {
                userId,
                logDate: new Date(logDate),
            },
        });

        if (existingLog) {
            return res.status(400).json({
                message: 'Log already exists for this user on the specified date',
                error: 'Duplicate logDate for userId',
            });
        }

        // Create the new log if no matching log exists
        const newLog = await logService.createLog({
            userId,
            moodRating,
            anxietyLevel,
            sleepHours,
            sleepQuality,
            sleepDisturbances,
            physicalActivity,
            activityDuration,
            socialInteractions,
            stressLevel,
            symptoms,
            logDate: new Date(logDate), // Store logDate as a Date object
        });

        return res.status(201).json({ message: 'Log created successfully', data: newLog });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating log', error: error.message });
    }
};

exports.getAllLogs = async (req, res) => {
    try {
        const { userId } = req.query;

        let logs;
        if (userId) {
            logs = await logService.getLogsByUserId(userId);
        }

        return res.status(200).json({ message: 'Logs fetched successfully', data: logs });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching logs', error: error.message });
    }
};


exports.getLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const log = await logService.getLogById(id);

        if (!log) {
            return res.status(404).json({ message: 'Log not found', error: 'Log not found' });
        }

        return res.status(200).json({ message: 'Log fetched successfully', data: log });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching log', error: error.message });
    }
};

exports.editLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { moodRating, anxietyLevel, sleepHours, sleepQuality, sleepDisturbances, physicalActivity, activityDuration, socialInteractions, stressLevel, symptoms, logDate } = req.body;

        const updatedLog = await logService.updateLog(id, {
            moodRating,
            anxietyLevel,
            sleepHours,
            sleepQuality,
            sleepDisturbances,
            physicalActivity,
            activityDuration,
            socialInteractions,
            stressLevel,
            symptoms,
            logDate
        });

        if (!updatedLog) {
            return res.status(404).json({ message: 'Log not found', error: 'Log not found' });
        }

        return res.status(200).json({ message: 'Log updated successfully', data: updatedLog });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating log', error: error.message });
    }
};

exports.deleteLog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLog = await logService.deleteLog(id);

        if (!deletedLog) {
            return res.status(404).json({ message: 'Log not found', error: 'Log not found' });
        }

        return res.status(200).json({ message: 'Log deleted successfully', data: deletedLog });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting log', error: error.message });
    }
};

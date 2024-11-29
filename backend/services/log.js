// services/logService.js
const db = require("../models");

exports.createLog = async (logData) => {
    return await db.Log.create(logData);
};

exports.getAllLogs = async () => {
    return await db.Log.findAll();
};

exports.getLogById = async (id) => {
    return await db.Log.findByPk(id);
};

exports.updateLog = async (id, logData) => {
    const log = await db.Log.findByPk(id);
    if (!log) return null;

    return await log.update(logData);
};

exports.deleteLog = async (id) => {
    const log = await db.Log.findByPk(id);
    if (!log) return null;

    await log.destroy();
    return log;
};

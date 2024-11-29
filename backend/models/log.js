'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Log.init({
    userId: DataTypes.STRING,
    moodRating: DataTypes.INTEGER,
    anxietyLevel: DataTypes.INTEGER,
    sleepHours: DataTypes.FLOAT,
    sleepQuality: DataTypes.STRING,
    sleepDisturbances: DataTypes.STRING,
    physicalActivity: DataTypes.STRING,
    activityDuration: DataTypes.INTEGER,
    socialInteractions: DataTypes.INTEGER,
    stressLevel: DataTypes.INTEGER,
    symptoms: DataTypes.STRING,
    logDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};
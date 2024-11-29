'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      moodRating: {
        type: Sequelize.INTEGER
      },
      anxietyLevel: {
        type: Sequelize.INTEGER
      },
      sleepHours: {
        type: Sequelize.FLOAT
      },
      sleepQuality: {
        type: Sequelize.STRING
      },
      sleepDisturbances: {
        type: Sequelize.STRING
      },
      physicalActivity: {
        type: Sequelize.STRING
      },
      activityDuration: {
        type: Sequelize.INTEGER
      },
      socialInteractions: {
        type: Sequelize.INTEGER
      },
      stressLevel: {
        type: Sequelize.INTEGER
      },
      symptoms: {
        type: Sequelize.STRING
      },
      logDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Logs');
  }
};
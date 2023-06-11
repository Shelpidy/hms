'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BloodTransfusions', {
      transfusionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      donorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Donors',
          key: 'donorId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      recipientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'requirers',
          key: 'requirerId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      transfusionDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      bloodGroupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'BloodGroups',
          key: 'bloodGroupId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BloodTransfusions');
  }
};


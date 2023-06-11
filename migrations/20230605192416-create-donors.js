'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Donors', {
      donorId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      middleName: {
        type: Sequelize.STRING(50)
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM('male', 'female', 'other')
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      contactNumber: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50)
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
    await queryInterface.dropTable('Donors');
  }
};

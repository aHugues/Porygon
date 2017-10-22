'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Movies');
  }
};

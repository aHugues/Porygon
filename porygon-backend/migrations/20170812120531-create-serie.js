'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Series', {
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
      season: {
        type: Sequelize.INT
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Series');
  }
};

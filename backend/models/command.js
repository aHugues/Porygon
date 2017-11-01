/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Command = sequelize.define('Command', {
    id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(40),
      allowNull: false
  },
  remarks: {
    type: DataTypes.STRING(150),
    allowNull: true
  }
    },  {
    timestamps: false
  }, {
    tableName: 'Commands'
  });

  return Command;
 }

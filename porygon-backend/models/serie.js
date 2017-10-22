/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Serie = sequelize.define('Serie', {
    id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    season: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    location: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id'
      }
    },
    remarks: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
}, {
    timestamps: false
}, {
    tableName: 'Series'
  });

  Serie.associate = function(models) {
      Serie.belongsTo(models.Location, {foreignKey: 'location', targetKey: 'id'});
  };

  return Serie;
};

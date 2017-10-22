/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    label: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
    },  {
    timestamps: false
  }, {
    tableName: 'Locations'
  });

  Location.associate = function(models) {
      Location.hasMany(models.Movie, {foreignKey: 'location', sourceKey: 'id'});
      Location.hasMany(models.Serie, {foreignKey: 'location', sourceKey: 'id'});
  };

  return Location;
 }

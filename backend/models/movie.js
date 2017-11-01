/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define('Movie', {
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
    location: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Location',
        key: 'id'
      }
    },
    remarks: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    director: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    actors: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    year: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        allowNull: true
    }}, {
        timestamps: false
    }, {
    tableName: 'Movies'
    });

    Movie.associate = function(models) {
        Movie.belongsTo(models.Location, {foreignKey: 'location', targetKey: 'id'});
    };

    return Movie;
}

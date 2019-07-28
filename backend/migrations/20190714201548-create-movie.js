/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('Movie', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    location_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'movie_location_fk',
        table: 'Location',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    title: {
      type: 'string',
      notNull: true,
    },
    remarks: {
      type: 'string',
      notNull: true,
      defaultValue: '',
    },
    actors: {
      type: 'string',
      notNull: true,
      defaultValue: '',
    },
    director: {
      type: 'string',
      notNull: true,
      defaultValue: '',
    },
    year: {
      type: 'int',
      notNull: true,
      defaultValue: -1,
    },

  }, (err) => {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function (db, callback) {
  db.dropTable('Movie', callback);
};

exports._meta = {
  version: 1,
};

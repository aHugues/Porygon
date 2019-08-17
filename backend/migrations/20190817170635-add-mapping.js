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
  function createMappingSerieSupport(err) {
    if (err) return callback(err);

    return db.createTable('MappingSerieSupport', {
      id: {
        type: 'int',
        primaryKey: true,
        autoIncrement: true,
        notNull: true,
      },
      serie_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'mapping_support_serie_serie_fk',
          table: 'Serie',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT',
          },
          mapping: 'id',
        },
      },
      support_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'mapping_support_serie_support_fk',
          table: 'Support',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT',
          },
          mapping: 'id',
        },
      },
    }, (err2) => {
      if (err2) return callback(err2);
      return callback();
    });
  }

  db.createTable('MappingMovieSupport', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    movie_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'mapping_support_movie_movie_fk',
        table: 'Movie',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    support_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'mapping_support_movie_support_fk',
        table: 'Support',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
  }, createMappingSerieSupport);
};

exports.down = function (db, callback) {
  db.dropTable('MappingMovieSupport', (err) => {
    if (err) return callback(err);
    return db.dropTable('MappingSerieSupport', (err2) => {
      if (err) return callback(err2);
      return callback();
    });
  });
};

exports._meta = {
  version: 1,
};

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
  function fillSupport(label) {
    db.insert('Support', ['label'], [label], () => {});
  }

  function fillSupports(err) {
    if (err) return callback(err);
    const labels = [
      'Digital',
      'DvD',
      'BluRay',
      'BluRay 3D',
      'VHS',
    ];

    labels.forEach(fillSupport);
    return callback();
  }

  db.createTable('Support', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    label: {
      type: 'string',
      notNull: true,
    },
  }, fillSupports);
};

exports.down = function (db, callback) {
  db.dropTable('Support', (err) => {
    if (err) return callback(err);
    return callback();
  });
};

exports._meta = {
  version: 1,
};

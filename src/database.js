const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('src/data/summary.db');

const tableCheckQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='employees';`;
const createTableQuery = `CREATE TABLE IF NOT EXISTS employees(
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name VARCHAR(255) unique NOT NULL, 
  salary integer NULL, 
  currency VARCHAR(255) NOT NULL, 
  department VARCHAR(255) NOT NULL, 
  on_contract BOOLEAN NULL CHECK (on_contract IN (0, 1)),
  sub_department VARCHAR(255) NOT NULL);
  CONSTRAINT unique_name UNIQUE (name)`;


db.all(tableCheckQuery, function (err, rows) {
    if (err) {
        console.error(err.message);
        throw err;
    }
    if (!rows.length) {
        db.run(createTableQuery);
    } else {

    }
});

module.exports = db;

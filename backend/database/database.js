const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'cars.db'));

db.pragma('journal_mode = WAL'); 

db.exec(`
    CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        registration TEXT NOT NULL, 
        brand TEXT NOT NULL, 
        model TEXT NOT NULL, 
        notes TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    )
`);

console.log(' SQLite DB ready at db/cars.db');

module.exports = db;
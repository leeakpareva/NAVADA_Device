import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'signups.db');

// Ensure data directory exists
import fs from 'fs';
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create database connection
const db = new sqlite3.Database(dbPath);

// Initialize database table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export interface SignupEntry {
  id: number;
  email: string;
  created_at: string;
}

export const addEmail = (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT OR IGNORE INTO signups (email) VALUES (?)',
      [email],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

export const getAllEmails = (): Promise<SignupEntry[]> => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM signups ORDER BY created_at DESC',
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as SignupEntry[]);
        }
      }
    );
  });
};

export const getEmailCount = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT COUNT(*) as count FROM signups',
      (err, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.count);
        }
      }
    );
  });
};

export default db;
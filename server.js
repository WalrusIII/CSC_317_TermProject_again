// server.js
// simple Express.js backend


/*

const express = require('express');
var fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to inlcude static content from 'public' folder
app.use(express.static(path.join(__dirname, 'public')))


// setup the DB 
const dbPath = path.join(__dirname, 'data', 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database');
    
    // Create products table if it doesn't exist 
    // NEED EDITS, STILL SET UP AS "TODO" from prev assignment
    db.run(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        priority TEXT DEFAULT 'low',
        isComplete INTEGER DEFAULT 0,
        isFun TEXT
      )
    `);
  }
});

*/
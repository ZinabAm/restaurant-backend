// Um die Datenbank online zu hosten
const mysql = require('mysql2');
require('dotenv').config(); // .env-Datei einbinden

// Verbindung zur Railway-MySQL-Datenbank herstellen
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Verbindung testen
connection.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Railway-Datenbank:', err);
  } else {
    console.log('Mit der Railway-MySQL-Datenbank verbunden!');
  }
});

module.exports = connection;
//Ursprungliche Verbindung mit lokale Datenbank
/*const mysql = require('mysql2');

// Verbindung zur MySQL-Datenbank herstellen
const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'root',            
  password: 'admin',            
  database: 'restaurant_db' 
});

// Verbindung testen
connection.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank:', err);
  } else {
    console.log('Mit der MySQL-Datenbank verbunden!');
  }
});

module.exports = connection;*/



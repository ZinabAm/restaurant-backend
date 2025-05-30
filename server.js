const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const dotenv = require('dotenv');

// .env laden
dotenv.config()

const app = express();
//const PORT = 5000;
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ==================== SPEISEKARTE ==================== //

// GET: Alle Gerichte
app.get('/speisekarte', (req, res) => {
  const sql = 'SELECT * FROM speisekarte ORDER BY kategorie, id';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Fehler beim Abrufen der Speisekarte' });
    res.json(results);
  });
});

// POST: Neues Gericht hinzufügen
app.post('/speisekarte', (req, res) => {
  const { name, beschreibung, preis, kategorie } = req.body;
  const sql = 'INSERT INTO speisekarte (name, beschreibung, preis, kategorie) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, beschreibung, preis, kategorie], (err, result) => {
    if (err) return res.status(500).json({ error: 'Fehler beim Einfügen eines Gerichts' });
    res.json({ message: 'Gericht hinzugefügt', id: result.insertId });
  });
});

// PUT: Gericht bearbeiten
app.put('/speisekarte/:id', (req, res) => {
  const { name, beschreibung, preis, kategorie } = req.body;
  const sql = 'UPDATE speisekarte SET name = ?, beschreibung = ?, preis = ?, kategorie = ? WHERE id = ?';
  db.query(sql, [name, beschreibung, preis, kategorie, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Fehler beim Aktualisieren eines Gerichts' });
    res.json({ message: 'Gericht aktualisiert' });
  });
});

// DELETE: Gericht löschen
app.delete('/speisekarte/:id', (req, res) => {
  const sql = 'DELETE FROM speisekarte WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Fehler beim Löschen eines Gerichts' });
    res.json({ message: 'Gericht gelöscht' });
  });
});

// ==================== RESERVIERUNGEN ==================== //

// POST: Neue Reservierung speichern
app.post('/api/reservierung', (req, res) => {
  const { name, email, datum, uhrzeit, personen, bemerkung } = req.body;

  const sql = 'INSERT INTO reservierungen (name, email, datum, uhrzeit, personen, bemerkung) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, email, datum, uhrzeit, personen, bemerkung], (err, result) => {
    if (err) {
      console.error('Fehler beim Speichern der Reservierung:', err);
      return res.status(500).json({ error: 'Fehler beim Speichern der Reservierung' });
    }
    res.json({ message: 'Reservierung erfolgreich gespeichert', id: result.insertId });
  });
});

// GET: Alle Reservierungen abrufen
app.get('/api/reservierungen', (req, res) => {
  const sql = 'SELECT * FROM reservierungen ORDER BY datum DESC, uhrzeit DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Fehler beim Abrufen der Reservierungen:', err);
      return res.status(500).json({ error: 'Fehler beim Abrufen der Reservierungen' });
    }
    res.json(results);
  });
});

// DELETE: Reservierung löschen
app.delete('/api/reservierungen/:id', (req, res) => {
  const sql = 'DELETE FROM reservierungen WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Fehler beim Löschen der Reservierung' });
    res.json({ message: 'Reservierung gelöscht' });
  });
});


// ==================== START SERVER ==================== //

app.listen(PORT, () => {
  console.log(`✅ Server läuft unter: http://localhost:${PORT}`);
});

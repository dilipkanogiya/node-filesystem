const express = require('express');
const fs = require('fs');
const moment = require('moment');
const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
    const filename = `data/${timestamp}.txt`;
    const content = `Current Timestamp: ${timestamp}`;

    fs.writeFile(filename, content, (err) => {
        if (err) {
            return res.status(500).send('Error creating file');
        }
        res.send(`File ${filename} created successfully`);
    });
});

// Endpoint to retrieve all text files in the 'data' folder
app.get('/files', (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }
        res.json(files);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

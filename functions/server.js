const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/news.json', (req, res) => {
    fs.readFile('news.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading news file');
        } else {
            res.send(data);
        }
    });
});

app.post('/news.json', (req, res) => {
    fs.writeFile('news.json', JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            res.status(500).send('Error writing news file');
        } else {
            res.send('News updated successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.use('/.netlify/functions/api', router);
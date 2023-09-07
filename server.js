const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { tokenize, parse } = require('./htmlToObject');
const app = express();
app.use(cors());

const PORT = 3000;

app.use(express.json()); 
app.use(express.static('public')); // serve static files from a 'public' directory

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/parseHtml', (req, res) => {
    const { html } = req.body;
    const tokens = tokenize(html);
    const result = parse(tokens);
    res.json(result);
});

// CLI logic
if (process.argv.length > 2) {
    const filePath = process.argv[2];
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const tokens = tokenize(htmlContent);
    const result = parse(tokens);
    console.log(JSON.stringify(result, null, 2));
} else {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

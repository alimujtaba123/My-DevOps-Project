const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
res.json({
message: 'Hello from Mujjis Project!',
host: os.hostname(),
time: new Date().toISOString()
});
});


app.get('/health', (req, res) => res.send('OK'));


app.listen(port, () => console.log(`App listening on port ${port}`));
const express = require('express');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//start server
db.connect(err => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`Server runnning on port ${PORT}`);
    });
});

initializeApp();
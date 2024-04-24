const express = require('express');
const app = express();
const PORT = 3000;

const apiRouter = require('./api/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mountowanie routera
app.use('/', apiRouter);

app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));

const express = require('express');
const app = express();
const PORT = 3000;
const metoda = require('../Zad-14/middleware/metoda')

// const metoda = (req, res, next) => {
//     console.log("Metoda: ", req.method);
//     let sciezka = "Ścieżka: " + req.protocol + "://" + req.get('host') + req.originalUrl;
//     console.log(sciezka);
//     res.send(`<p>Metoda: ${req.method}</p><p>${sciezka}</p>`);
//     next();
// };

// Dodanie funkcji pośredniczącej do wszystkich żądań
// app.use(metoda)
app.use("/testowanie", metoda, (req, res) => { })


app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});

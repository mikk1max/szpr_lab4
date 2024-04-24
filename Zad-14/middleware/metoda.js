const metoda = (req, res, next) => {
    console.log("Metoda: ", req.method);
    let sciezka = "Ścieżka: " + req.protocol + "://" + req.get('host') + req.originalUrl;
    console.log(sciezka);
    res.send(`<p>Metoda: ${req.method}</p><p>${sciezka}</p>`);
    next();
};

module.exports = metoda
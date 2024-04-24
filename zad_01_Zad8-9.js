const express = require('express') //import frameworka express
const app = express() //utworzenie obiektu aplikacji app express
const PORT = 3000 //ustawienie portu

//routing:
// ZAD-1
app.get('/', function (req, res) {
    res.send('Prosty serwer oparty na szkielecie programistycznym Express!')
})

app.post('/', function (req, res) {
    res.send('Otrzymano żądanie POST na głównej stronie.');
});

app.get('/about', function (req, res) {
    res.send('Autor strony: Maksym Shepeta')
})

// ZAD-2
app.get('/name/:imie', function (request, response) {
    response.status(200);
    response.set('Content-Type', 'text/html');
    response.end('<html><body>' + '<h1>Cześć ' + request.params.imie + '</h1>' + '</body></html>');
});

app.get('/name/:imie/:nazwisko', function (request, response) {
    response.status(200);
    response.set('Content-Type', 'text/html');
    response.end('<html><body>' + '<h1>Cześć ' + request.params.imie + ' ' + request.params.nazwisko + '</h1>' + '</body></html>');
});

//ustawienie portu dla aplikacji i wyświetlenie informacji na konsoli
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`))

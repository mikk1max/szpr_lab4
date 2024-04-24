const express = require('express');
const path = require('path');
const users = require('../users');
const isAuthorized = require('../middleware/autoryzacja');
// const metoda = require('../middleware/metoda')

const router = express.Router();

// router.use("/testowanie", metoda, (req, res) => { })

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../form.html"));
});

router.post("/profile/:username", isAuthorized, (req, res) => {
    let username = req.params.username;
    let password = req.body.password;
    let languages = req.body.languages;

    if (!username || !password) {
        res.status(400).send("Uzupełnij dane!");
    } else {
        if (!Array.isArray(languages)) {
            languages = [languages]
        }

        let languagesString = languages ? languages.join(", ") : "Brak wybranych języków";
        let sciezka = "Ścieżka: " + req.protocol + "://" + req.get('host') + req.originalUrl;
        res.send("<b>Użytkownik: </b>" + username + "<br><b>Hasło: </b>" + password + "<br><b>Języki: </b>" + languagesString + `<p>Metoda: ${req.method}</p><p>${sciezka}</p>`);
    }
});

router.get('/users', (req, res) => {
    res.json(users);
});

router.get('/users/:username', (req, res) => {
    const { username } = req.params;
    const user = users.find(user => user.username === username);
    if (user) {
        res.json(user);
    } else {

        res.status(404).send('Użytkownik nie znaleziony');
    }
});

module.exports = router;

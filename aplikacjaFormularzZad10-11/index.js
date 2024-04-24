const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json()); // Setting up JSON parsing
app.use(express.urlencoded({ extended: true })); // Setting up URL-encoded form data parsing

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "form.html"));
});

// app.post("/result", (req, res) => {
//     let username = req.body.username; // Accessing username from req.body
//     let password = req.body.password; // Accessing password from req.body
//     let languages = req.body.languages;

//     if (!username || !password) {
//         res.send("Uzupełnij dane!");
//     } else {

//         if (!Array.isArray(languages)) {
//             languages = [languages]
//         }

//         let languagesString = languages ? languages.join(", ") : "Brak wybranych języków";
//         res.send("Użytkownik: " + username + "<br>Hasło: " + password + "<br>Języki: " + languagesString);
//     }
// });


// ZAD 11
const { check, validationResult } = require('express-validator');
const { error, log } = require('console');

const isIn = (min, max) => {
    return (input) => {
        if (input < 1 || input > 110) {
            throw new Error('Value out of range');
        }
        return true
    }
}

const getInitials = (fullName) => {
    const names = fullName.split(' ').filter(name => name.trim() != '');
    // console.log(names);
    return names.map(word => word.charAt(0) + '.').join(' ');
}

app.post("/form", [
    check('username')
        .trim()
        .custom((username) => {
            if (!username.includes(' ')) {
                throw new Error('Proszę podać zarówno imię, jak i nazwisko.');
            }
            return true;
        })
        .withMessage("Proszę podać zarówno imię, jak i nazwisko."),

    check('email').isEmail().withMessage("Błędny email").normalizeEmail(),
    check('age').isNumeric().custom(isIn(1, 110)).withMessage("Błędny wiek").stripLow()
        .bail()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // Pobranie pełnej nazwy użytkownika
    const username = req.body.username;
    const email = req.body.email;
    const age = req.body.age;

    // Konwersja pełnej nazwy użytkownika na inicjały
    const initials = getInitials(username);

    res.send("Użytkownik: " + initials + "<br>Email: " + email + "<br>Wiek: " + age);
})


app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));



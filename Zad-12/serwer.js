const users = require('./users')

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json()); // Setting up JSON parsing
app.use(express.urlencoded({ extended: true })); // Setting up URL-encoded form data parsing

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    res.json(users.filter(user => user.id === parseInt(req.params.id)))
})

app.get('/api/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie został odnaleziony` })
    }
})

app.post('/api/users', (req, res) => {
    const maxId = Math.max(...users.map(user => user.id)); // Znajdujemy maksymalne id w tablicy
    const newId = maxId + 1; // Tworzymy nowe unikatowe id
    const newUser = {
        id: newId,
        name: req.body.name,
        email: req.body.email,
        status: "aktywny"
    }
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({ msg: 'Wprowadź poprawne imię i nazwisko oraz email!' })
    }
    users.push(newUser)
    res.json(users)
})


app.patch('/api/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        const updUser = req.body
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updUser.name ? updUser.name : user.name
                user.email = updUser.email ? updUser.email : user.email
                res.json({ msg: 'Dane użytkownika zaktualizowane', user })
            }
        })
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` })
    }
})

app.delete('/api/users/:id', (req, res) => {
    const foundIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (foundIndex !== -1) {
        users.splice(foundIndex, 1)
        res.json({ msg: `Użytkownik o id ${req.params.id} został usunięty` })
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` })
    }
})


app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));

const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const {PORT} = require('./config/variables');
const users = require('./db/users.js');

const pathStatic = path.join(__dirname, 'static');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(pathStatic));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', pathStatic);

app.get('/', (req, res) => {
    res.render('firstPage');
})

app.get('/registration', (req, res) => {
    res.render('registration');
})

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        res.status(409).end('Wrong email or password !');
        return;
    }

    res.redirect('users');
});

app.post('/users', (req, res) => {
    const { email } = req.body;

    const userExist = users.some(user => user.email === email);

    console.log(userExist)
    if (userExist) {
        res.status(404).end('User exist, choose any email');
        return;
    }

    users.push(req.body);
    res.redirect('login');
});

app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    const user = users.find((user, i) => i === +user_id);

    if (!user) {
        res.status(404).end('User Not Found');
        return;
    }

    res.render('userPage', {user});
});

app.get('/users', (req, res) => {
    res.render('users', {users});
});

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

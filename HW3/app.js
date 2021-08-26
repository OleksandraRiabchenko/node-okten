const express = require('express');

const { PORT } = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter } = require('./routes');

app.use('/users', userRouter);

// app.get('/', (req, res) => {
//     res.render('firstPage');
// });
//
// app.get('/registration', (req, res) => {
//     res.render('registration');
// });
//
// app.get('/login', (req, res) => {
//     res.render('login');
// });
//
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const user = users.find((u) => u.email === email && u.password === password);
//
//     if (!user) {
//         res.status(409).end('Wrong email or password !');
//         return;
//     }
//
//     res.redirect('users');
// });
//
// app.post('/users', (req, res) => {
//     const { email } = req.body;
//     const userExist = users.some((user) => user.email === email);
//
//     if (userExist) {
//         res.status(404).end('User exist, choose any email');
//         return;
//     }
//
//     users.push(req.body);
//     res.redirect('login');
// });
//
// app.get('/users', (req, res) => {
//     res.render('users', { users });
// });
//
// app.get('/users/:user_id', (req, res) => {
//     const { user_id } = req.params;
//     const user = users.find((u, i) => i === +user_id);
//
//     if (!user) {
//         res.status(404).end('User Not Found');
//         return;
//     }
//
//     res.render('userPage', { user });
// });

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

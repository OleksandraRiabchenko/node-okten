const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const {PORT} = require('./config/variables');
const users = require('./db/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRouter = require('./routes/user.router');

app.get('ping', (req, res) => {res.json('Pong')});

app.get('/', (req, res) => {
    console.log(req);
    res.status(404).end('Not Found');
});

app.use('/users', userRouter);


app.post('/auth', (req, res) => {

    const {name, password} = req.body;
    res.json(`Hello ${name}` );

});

app.listen(PORT, () => {
    console.log('App listen', PORT);
})

//GOOD NAME ROUTES
// app.get('/users', (req, res) => {
//     ////
// })
// app.post('/users', (req, res) => {
//     ////
// })
// app.get('/users/:user_id', (req, res) => {
//    ////
// });
// app.delete('/users/:user_id', (req, res) => {
//    ////
// });
// app.put('/users/:user_id', (req, res) => {
//    ////
// });
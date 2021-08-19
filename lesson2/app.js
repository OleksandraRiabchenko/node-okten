// імпортуємо експресс
const express = require('express');
// після iмпорту в консолі express-handlebars потрібно реквайрити в змінну
const expressHbs = require('express-handlebars');
const path = require('path');

const {PORT} = require('./config/variables');
const users = require('./db/users');

// створюємо саму апку
const app = express();

// щоб наша аплікуха могла зчитувати json
app.use(express.json());
//щоб наша аплікуха могла зчитувати json спеціального формату
app.use(express.urlencoded({extended: true}));

// express-handlebars:
//надаємо доступ до статичної папки, щоб нода не заборонила доступ до цієї папки
app.use(express.static(path.join(__dirname, 'static')));
//після втановлення handlebars потрібно зробити налаштування, встановити опції
//встановлюємо опцію відмальовування двигуном файлів з розширенням .hbs
app.set('view engine', '.hbs');
// для двигуна hbs потрібно виконувати ф-цію, яка буде hbs обробляти обробником буде expressHbs
//але потрібно вказати defaultLayout: false - щоб воно не шукало файл з назвою main.hbs
app.engine('.hbs', expressHbs({defaultLayout: false}));
//навішуємо опцію, яка каже, що наші views знаходяться десь і передаємо маршрут до них
app.set('views', path.join(__dirname, 'static'));


// get - як роутінг, вказується маршрут, req - request - запит, res- response - відповідь
// іноді роблять пінг-понг-роутінг або healthy-ok-роутінг, щоб перевірити чи робоча апка
// app.get('ping', (req, res) => {
//     res.json('Pong');
// });

app.get('/', (req, res) => {
    console.log(req);
    //end - response який закінчює і видає інфу
    //end, send - можна передавати теги
    //res.end('asdsa');
    // res.send('<h1>hello</h1>');

    //json - дозволяє передавати будь-які об'єкти
    // res.json({ name: 'Viktor' });
// write - зазвичай не використовують, щоб завершилась дія потрібно використати end
//     res.write('HELLO');
//     res.write('WORLD');
//     res.write('99999');
//     res.end();

    // status - можна передавати статус кода/помилок
    res.status(404).end('Not Found');
});

app.get('/login', (req, res) => {
    res.render('login', {isMale: true});
});

// на лінці /users  прорендери view = 'users.hbs', розширення .hbs вказувати не потрібно, бо ми задали опції в 18-28 строках
app.get('/users', (req, res) => {
    res.render('users', {userName: 'Viktor', users});
});

app.get('/users/:user_id', (req, res) => {
    const {user_id} = req.params;
    // req.query - динамічні параметри які можуть як бути так і ні(тобто ми їх не очікуємо, але можемо відслідкувати)
    console.log(req.query);
    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User Not Found');
        return;
    }
    res.json(currentUser);
});

app.post('/auth', (req, res) => {
    //console.log(req.body);
    const {name, password} = req.body;
    res.json(`Hello ${name}` );
    // не можливо відправити 2 респонса, буде помилка, це аналогічно як з одним return
    // res.json('hello');
});


//навішуємо прослуховувача, адреса буде localhost:5000
app.listen(PORT, () => {
    console.log('App listen', PORT);
})
// після запуску сервера, консоль стає мертва, дo тих пір поки ми не зупинимо сервер ctrl+C

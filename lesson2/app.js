// імпортуємо експресс
const express = require('express');
// після iмпорту в консолі express-handlebars потрібно реквайрити в змінну
const expressHbs = require('express-handlebars');

// створюємо саму апку
const app = express();

//навішуємо прослуховувача, адреса буде localhost:5000
app.listen(5000, () => {
    console.log('App listen 5000')
})
// після запуску сервера, консоль стає мертва, дo тих пір поки ми не зупинимо сервер ctrl+C

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

app.get('/users', (req, res) => {
    res.json(
        [
            {name: 'Dimas'},
            {name: 'Olya'}
        ]
    )
});

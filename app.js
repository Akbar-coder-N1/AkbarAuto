const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router/router');
const CreatePath = require('./helper/CreatePath');
const passport = require('passport');
const logger = require('morgan');
const session = require('express-session');

const SQLiteStore = require('connect-sqlite3')(session);

;




const port = 3000;
const app = express();

// EJS ni view engine sifatida sozlash
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'))

// Static fayllarni serverga ulash
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(CreatePath('public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/db/img', express.static(path.join(__dirname, 'db', 'img')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routerni ulash
app.use(router);

// Serverni ishga tushirish
app.listen(3000,'192.168.1.111',() => {
    console.log(`Server started`);
});


/*
post - qoshish
get - olish
delete - ochirish
put - ozgartirish
*/
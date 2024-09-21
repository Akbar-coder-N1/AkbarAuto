const CreatePath = require('../helper/CreatePath');
const pool = require('../helper/Pool');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Mysite = `AkbarAuto`;

passport.use(new LocalStrategy(function verify(username, password, cb) {
  pool.query('SELECT * FROM users WHERE username = ?', [username], function(err, row) {
      if (err) { return cb(err); }
      if (row.length === 0) { // Проверяем, что есть хотя бы одна запись
          return cb(null, false, { message: 'Incorrect username or password.' });
      }
      const user = row[0]; // Извлекаем первую запись

      if (!user.salt) { // Проверяем наличие salt
          return cb(null, false, { message: 'Salt is missing.' });
      }
      

      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
          if (err) { return cb(err); }
          if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
              return cb(null, false, { message: 'Incorrect username or password.' });
          }
          return cb(null, user);
      });
  });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


const HomeGet = (req,res)=>{
    res.render(CreatePath(`index`) ,{title:`${Mysite} | Home`});
}

const PriceGet = (req,res)=>{
    pool.query('SELECT * FROM price;',(error, results, fields)=>{
        res.render(CreatePath('price'),{title:`${Mysite} | Avtomobilar`,price:results});
      });
}

const AddcarGet = (req,res)=>{
    console.log(req);
    res.render(CreatePath('addcar'),{title:`${Mysite} | Kiritish`});
};

const AddcarPost = (req,res) => {
    const img = req.file.filename;
    const {name,mileage,price} = req.body;
    pool.query('INSERT INTO price SET ?', {name,mileage,price,img},function (error, results, fields) {
        if (error) throw error;
      });
    res.redirect('/');
};


const CarGet = (req,res)=>{
    pool.query(`SELECT * FROM price WHERE ID = ${req.params.id}`,function (error, results, fields) {
        if (error) throw error;
        const avto = results[0];
        res.render(CreatePath('car'),{title:`${Mysite} | Axborot`,avto});
      });
};

const loginget = (req, res, next) =>{
    res.render(CreatePath('login'),{title:`${Mysite} | Sing in` });
}

const loginpost = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

const signget = (req, res, next) => {
    res.render(CreatePath('signup'),{title:`${Mysite} | Sing up` });
}

const signpost = (req, res, next) => {
  console.log(req.body);

  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
    if (err) { return next(err); }

    pool.query('INSERT INTO users SET ?', { username: req.body.username, password: hashedPassword }, function (error, results, fields) {
      if (error) { return next(error); }

      const user = {
        id: results.insertId, // исправлено на правильный метод получения ID
        username: req.body.username
      };

      console.log(req);
      req.login(user, function (err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });
  });
};


  module.exports = {
    HomeGet,
    PriceGet,
    AddcarGet,
    AddcarPost,
    CarGet,
    loginget,
    signget,
    signpost,
    loginpost,
}
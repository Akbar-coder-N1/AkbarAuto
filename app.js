const express = require(`express`);
const path = require(`path`);
const port = 3000;
const bodyParser = require('body-parser');
const router = require('./router/router');
const CreatePath = require('./helper/CreatePath');
const app = express();

app.set(`view engine`,`ejs`);

app.use(express.static(CreatePath('public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/style',express.static('./style'));
app.use('/db/img',express.static('./db/img'));
app.use('/img',express.static('./img'));
app.use('/uploads',express.static('./uploads'));
app.use(router);

app.listen(3000,"192.168.1.102"),()=>{
    console.log(`Server started`);
}

/*
post - qoshish
get - olish
delete - ochirish
put - ozgartirish
*/
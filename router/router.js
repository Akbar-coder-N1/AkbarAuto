const express = require('express');
const multer = require('multer');
const upload = multer({dest: `uploads/`});

const {
    HomeGet,
    PriceGet,
    AddcarGet,
    AddcarPost,
    CarGet,
    loginget,
    loginpost,
    signget,
    signpost,
} = require('../controller/controller');

const router = express.Router();


router.post('/login',loginpost);
router.get(`/`,HomeGet);
router.get('/price',PriceGet);
router.get('/addcar',AddcarGet);
router.post('/addcar',upload.single(`img`),AddcarPost);
router.get('/price/:id',CarGet);
router.get('/login', loginget);
router.get('/signup',signget);
router.post('/signup', signpost);



module.exports = router;
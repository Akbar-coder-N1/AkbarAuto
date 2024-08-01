const express = require('express');
const multer = require('multer');
const upload = multer({dest: `uploads/`});
const {
    HomeGet,
    PriceGet,
    AddcarGet,
    AddcarPost,
    CarGet,
} = require('../controller/controller');

const router = express.Router();

router.get(`/`,HomeGet);
router.get('/price',PriceGet);
router.get('/addcar',AddcarGet);
router.post('/addcar',upload.single(`img`),AddcarPost);
router.get('/price/:id',CarGet);

module.exports = router;
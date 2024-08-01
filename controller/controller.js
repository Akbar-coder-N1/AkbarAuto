const CreatePath = require('../helper/CreatePath');
const pool = require('../helper/Pool');
const Mysite = `AkbarAuto`;


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
        // connected!
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

module.exports = {
    HomeGet,
    PriceGet,
    AddcarGet,
    AddcarPost,
    CarGet,
}
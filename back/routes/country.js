const express = require('express');
const router = express.Router();
const db = require('../models'); 
var { Country } = require('../models');

router.get('/', async (req,res) => {
    try {
        const country = await db.Country.findAll({});

        if(!country){
            return res.status(404).send('등록된 국가가 없습니다.');
        }

        res.json(country);
        console.log(country);

    } catch(err) {
        console.log(err);
        return next(err);
    };
});

// router.get('/', async function(req,res,next){
//     let result = await db.Country.findAll();
//     if(result){

//     }
// });

router.post('/', async (req,res,next) => {
    
    try{
        const newCountry = await db.Country.create({
            country_name : req.body.country_name,
            population : req.body.population,
            continent : req.body.continent
        });
        console.log(newCountry.country_name);
        return res.status(201).json(newCountry);
    } catch(err){
        console.log(err);
        return next(err);
    }

});


module.exports = router;
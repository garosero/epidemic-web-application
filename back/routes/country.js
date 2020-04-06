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

router.post('/', async (req,res,next) => {
    
    try{
        const newCountry = await db.Country.create({
            name : req.body.name,
            url : req.body.url
        });
        console.log(newCountry.name);
        return res.status(201).json(newCountry);
    } catch(err){
        console.log(err);
        return next(err);
    }

});


module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../models'); 
var { Diseases } = require('../models');

router.get('/', async(req,res,next) => {
    try {
        const allDisease = await db.Diseases.findAll({});

        if(!allDisease){
            return res.status(404).send('등록된 국가가 없습니다.');
        }

        res.json(allDisease);
        console.log(allDisease);

    } catch(err) {
        console.log(err);
        return next(err);
    };

});

router.post('/',async(req,res,next) => {
    try{
        const newDisease = await db.Diseases.create({
            disease_name : req.body.disease_name,
        });
        console.log(newDisease.disease_name);
        return res.status(201).json(newDisease);
    } catch(err){
        console.log(err);
        return next(err);
    }

});

module.exports = router;
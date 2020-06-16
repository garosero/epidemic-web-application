const express = require('express');
const router = express.Router();
const db = require('../models'); 
var { Rsquare } = require('../models');
const { Op } = require('sequelize');


router.get('/:disease_name/:country_name', async(req,res,next)=> {
    //let searchWord = req.params.country_name;

    try {
        const allCase = await db.Rsquare.findOne({
            where : {
                disease_name : req.params.disease_name,
                country_name : req.params.country_name,
            },
            attributes:['Rsquare'],
        });
        if(!allCase){
            return res.status(404).send('해당 국가 자료가 없습니다.');
        }
        res.json(allCase);
        console.log(allCase);

    }catch(err){
        console.log(err);
        return next(err)
    };
});

module.exports = router;
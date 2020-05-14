const express = require('express');
const router = express.Router();
const db = require('../models'); 
var { Cases } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

router.get('/', async(req,res,next)=>{
    try {
        const allCase = await db.Cases.findAll({});
 
        if(!allCase){
            return res.status(404).send('등록된 국가가 없습니다.');
        }

        res.json(allCase);
        console.log(allCase);

    } catch(err) {
        console.log(err);
        return next(err);
    };

});

//나라별로 오늘날짜의 확진자만 구하기
//SELECT SUM(confirmed) FROM case where today
router.get('/confirmed/1', async(req,res,next)=> {
    try{
        const allConfirmed = await db.Cases.sum('confirmed',{
            where : {
                days:{
                    [Op.gte] : moment().subtract(2,'days').toDate()
                }
            }
        });
        if(!allConfirmed){
            return res.status(404).send('전체 확진자수가 없습니다.');
        }
        res.json(allConfirmed);
        console.log(allConfirmed);

    }catch(err){
        console.log(err);
        return next(err);
    }
})

router.get('/confirmed/2', async(req,res,next)=> {
    try{
        const allConfirmed = await db.Cases.sum('confirmed',{
            where : {
                days:{
                    [Op.gte] : moment().subtract(3,'days').toDate()
                }
            }
        });
        if(!allConfirmed){
            return res.status(404).send('전체 확진자수가 없습니다.');
        }
        res.json(allConfirmed);
        console.log(allConfirmed);

    }catch(err){
        console.log(err);
        return next(err);
    }
})


router.get('/:country_name', async(req,res,next)=> {
    let searchWord = req.params.country_name;

    try {
        const allCase = await db.Cases.findAll({
            where : {
                country_name : req.params.country_name,
            }
        });
        if(!allCase){
            return res.status(404).send('해당 국가 자료가 없습니다.');
        }
        console.log("searchWord : "+searchWord);
        res.json(allCase);
        console.log(allCase);

    }catch(err){
        console.log(err);
        return next(err)
    };
});



router.post('/', async(req,res,next)=>{
    try{
        const newCase = await db.Case.create({
            country_name : req.body.country_name,
            disease_name : req.body.disease_name,
            days : req.body.days,
            confirmed : req.body.confirmed,
            death : req.body.death,
            recovered : req.body.recovered

        });
        console.log(newCase.days);
        return res.status(201).json(newCase);
    } catch(err){
        console.log(err);
        return next(err);
    }

})
//https://stackoverflow.com/questions/29798357/sequelize-where-statement-with-date

module.exports = router;
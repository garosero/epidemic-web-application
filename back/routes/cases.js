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
router.get('/:disease_name/confirmed/1', async(req,res,next)=> {
    try{
        const allConfirmed = await db.Cases.sum('confirmed',{
            where : {
                days:{
                    [Op.gte] : moment().subtract(2,'days').toDate()
                },
                disease_name : req.params.disease_name,
            }
        });

        const allDeath = await db.Cases.sum('death',{
            where : {
                days : {
                    [Op.gte] : moment().subtract(2,'days').toDate()
                }
            }
        })

        if(!allConfirmed || !allDeath){
            return res.status(404).send('전체 확진자수가 없습니다.');
        }
        const resObj = {
            confirmed : allConfirmed,
            death : allDeath,
        };
        res.json(resObj);
        console.log(resObj);

    }catch(err){
        console.log(err);
        return next(err);
    }
})

router.get('/:disease_name/confirmed/2', async(req,res,next)=> {
    try{
        const allConfirmed = await db.Cases.sum('confirmed',{
            where : {
                days:{
                    [Op.gte] : moment().subtract(3,'days').toDate()
                },
                disease_name : req.params.disease_name,
            }
        });

        const allDeath = await db.Cases.sum('death',{
            where : {
                days:{
                    [Op.gte] : moment().subtract(3,'days').toDate()
                }
            }
        });

        const resObj = {
            confirmed : allConfirmed,
            death : allDeath,
        };

        if(!allConfirmed || !allDeath){
            return res.status(404).send('전체 확진자수가 없습니다.');
        }
        res.json(resObj);
        console.log(resObj);

    }catch(err){
        console.log(err);
        return next(err);
    }
})

router.get('/:disease_name/allCountry', async(req,res,next)=>{
    try {
        const allCountry = await db.Cases.findAll({
            where : {
                days : {
                    [Op.gte] : moment().subtract(2,'days').toDate()
                },
                disease_name : req.params.disease_name,
            },
            attributes:['country_name','confirmed','death','recovered'],
        });
        if(!allCountry){
            return res.status(404).send('전체 데이터가 존재하지 않습니다.');
        }
        res.json(allCountry);
        console.log(allCountry);
    }catch(err){
        console.log(err);
        return next(err);
    }
})


router.get('/:disease_name/:country_name', async(req,res,next)=> {
    let searchWord = req.params.country_name;

    try {
        const allCase = await db.Cases.findAll({
            where : {
                disease_name : req.params.disease_name,
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
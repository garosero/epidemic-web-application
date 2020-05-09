const express = require('express');
const router = express.Router();
const db = require('../models'); 
var { Case } = require('../models');

// router.get('/', async(req,res,next)=>{
//     try {
//         const allCase = await db.Case.findAll({});
 
//         if(!allCase){
//             return res.status(404).send('등록된 국가가 없습니다.');
//         }

//         res.json(allCase);
//         console.log(allCase);

//     } catch(err) {
//         console.log(err);
//         return next(err);
//     };

// });

router.get('/:country_name', async(req,res,next)=> {
    let searchWord = req.params.country_name;

    try {
        const allCase = await db.Case.findAll({
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

module.exports = router;
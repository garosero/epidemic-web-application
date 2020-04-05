const express = require('express');
const router = express.Router();
var { Diseases } = require('../models');

router.get('/', (req,res) => {
    
});

router.post('/',(req,res,next) => {
    console.log(res);

    const disease = new Diseases({
        name : req.body.name,
        date : req.body.date,
        death : req.body.death,
        recovered : req.body.recovered
    })
    .then((result)=> {
        console.log(result);
        res.status(201).json(result);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    })

});

module.exports = router;
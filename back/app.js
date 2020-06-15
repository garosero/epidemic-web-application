const express = require('express');
const db = require('./models'); //자동으로 테이블 생성
const app = express();
var cors = require('cors');
const countryAPIRouter = require('./routes/country');
const diseaseAPIRouter = require('./routes/disease');
const caseAPIRouter = require('./routes/cases');
const predictedAPIRouter = require('./routes/predicted');

db.sequelize.sync()
    .then(()=> {
        console.log('DB connection success');
    })
    .catch(err=>{
        console.log('DB connection error');
        console.log(err);
    })

app.get('/',(req,res) => {
    res.send('hello');
})

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cors()); //CORS 설정 
app.use('/api/country',countryAPIRouter);
app.use('/api/disease',diseaseAPIRouter);
app.use('/api/cases',caseAPIRouter);
app.use('/api/predicted',predictedAPIRouter);



module.exports = app;

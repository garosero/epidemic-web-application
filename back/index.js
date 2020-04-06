const express = require('express');
const db = require('./models'); //자동으로 테이블 생성
const app = express();
var cors = require('cors');
db.sequelize.sync(); //
const countryAPIRouter = require('./routes/country');
const diseaseAPIRouter = require('./routes/disease');


app.get('/',(req,res) => {
    res.send('hello');
})

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cors()); //CORS 설정 
app.use('/api/country',countryAPIRouter);
app.use('/api/disease',diseaseAPIRouter);

app.listen(8080, ()=> {
    console.log('server is running on localhost:8080');
})
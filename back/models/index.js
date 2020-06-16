'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
//config.json의 설정 적용 이 인스턴스의 객체인 sequelize 이용해서 db 컨트롤 

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Country = require('./country')(sequelize,Sequelize);
db.Cases = require('./cases')(sequelize,Sequelize);
db.Diseases = require('./diseases')(sequelize,Sequelize);
db.Predicted = require('./predicted_case')(sequelize,Sequelize);
db.Rsquare = require('./rsquare')(sequelize,Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
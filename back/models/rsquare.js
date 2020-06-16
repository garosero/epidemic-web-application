
/*model*/
module.exports = (sequelize,DataTypes)=> {
    const Rsquare = sequelize.define('rsquare', {
       country_name : {
            type: DataTypes.STRING(100),
            allowNull:false,
        },
       disease_name : {
            type: DataTypes.STRING(100),
            allowNull:false,
       },
    //    days : {
    //     type: DataTypes.DATEONLY,
    //     get: function() {
    //        return moment(this.getDataValue('DateTime')).format('DD.MM.YYYY')
    //     }
    //   }
    
       rsquare : {
           type: DataTypes.DOUBLE,
           allowNull:false,
       },
      
       
    },
    {
        timestamps : false,
        tableName : "RSQUARE",
    },
    {
      indexes : [
        {
          unique:true,
          fields:['country_name','disease_name']
       }
      ]
    },   
    {
        charset:'utf8',
        collate: 'utf8_general_ci'
    }, 
    );

    Rsquare.associate = (db) => {
        db.Rsquare.belongsTo(db.Country,{foreignKey : 'fk_country_name'}); //{foreignKey:' '}로 외래키이름 설정 가능
        db.Rsquare.belongsTo(db.Diseases,{foreignKey : 'fk_disease_name'});
    };
    Rsquare.removeAttribute('id');

    return Rsquare;

    //국가별 결정계수
}
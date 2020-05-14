
/*model*/
module.exports = (sequelize,DataTypes)=> {
    const Cases = sequelize.define('cases', {
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
    
       days : {
           type: DataTypes.DATE,
           allowNull:false,
       },
       confirmed : {
            type : DataTypes.INTEGER,
            allowNull:false,
       },
       death : {
           type: DataTypes.INTEGER,
           allowNull:false,
       },
       recovered : {
            type: DataTypes.INTEGER,
            allowNull:false,
       },
       
    },
    {
        timestamps : false,
        tableName : "CASES",
    },
    {
      indexes : [
        {
          unique:true,
          fields:['country_name','disease_name','days']
       }
      ]
    },   
    {
        charset:'utf8',
        collate: 'utf8_general_ci'
    }, 
    );

    Cases.associate = (db) => {
        db.Cases.belongsTo(db.Country,{foreignKey : 'fk_country_name'}); //{foreignKey:' '}로 외래키이름 설정 가능
        db.Cases.belongsTo(db.Diseases,{foreignKey : 'fk_disease_name'});
    };
    Cases.removeAttribute('id');

    return Cases;

    //가공되지 않은 국가별 확진자 데이터
}
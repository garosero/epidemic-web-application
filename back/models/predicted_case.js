
/*model*/
module.exports = (sequelize,DataTypes)=> {
    const predicted_case = sequelize.define('predicted_case', {
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
       infectious : {
            type : DataTypes.DOUBLE,
            allowNull:false,
       },
       
    },
    {
        timestamps : false,
        tableName : "PREDICTED_CASE",
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

    predicted_case.associate = (db) => {
        db.predicted_case.belongsTo(db.Country,{foreignKey : 'fk_country_name'}); //{foreignKey:' '}로 외래키이름 설정 가능
        db.predicted_case.belongsTo(db.Diseases,{foreignKey : 'fk_disease_name'});
    };
    predicted_case.removeAttribute('id');

    return predicted_case;

    //가공된 않은 국가별 확진자 데이터
}
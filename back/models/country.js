module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('Country',{
        country_name : {
            type: DataTypes.STRING(30),
            allowNull:false,
            unique:true,
        },
        population : {
            type:DataTypes.BIGINT, //인구수는 INTEGER 범위 벗어남
            allowNull: false,
        },
        continent : {
            type: DataTypes.STRING(30),
            allowNull:false,
        }

    },
    { timestamps: false }, //unkownColumn 에러 해결방법... 모델 수정한 뒤에 나는 에러인듯. 
    {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    Country.associate = (db) => {
        db.Country.hasMany(db.Case,{sourceKey:'country_name'});
        db.Country.hasMany(db.Disease,{sourceKey:'country_name'})
    };

    return Country;

}
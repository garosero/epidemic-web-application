

module.exports = (sequelize,DataTypes)=> {
    const Country = sequelize.define('Data', {
        name : {
            type: DataTypes.STRING(20),
            allowNull:false,
            unique:true,
        },
        date : {
           type : DataTypes.DATE,
           allowNull:false,
       },
       death : {
           type: DataTypes.DECIMAL,
           allowNull:false,
       },
       recovered : {
            type: DataTypes.DECIMAL,
            allowNull:false,
       }

    }, {
        charset:'utf8',
        collate: 'utf8_general_ci'
    });

    Country.associate = (db) => {
        db.Data.hasManyTo(db.Country);
    };

    return Country;
}
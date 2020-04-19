

module.exports = (sequelize,DataTypes)=> {
    const Diseases = sequelize.define('Diseases', {
        disease_name : {
            type: DataTypes.STRING(20),
            allowNull:false,
            unique:true,
        }

    }, {
        charset:'utf8',
        collate: 'utf8_general_ci'
    });

    Diseases.associate = (db) => {
        db.Diseases.hasMany(db.Case,{sourceKey:'disease_name'});
        db.Diseases.belongsTo(db.Country,{foreignKey:'fk_country_name',sourceKey:'country_name'});
    };

    return Diseases;
}
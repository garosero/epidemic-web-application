

module.exports = (sequelize,DataTypes)=> {
    const Diseases = sequelize.define('Diseases', {
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

    Diseases.associae = (db) => {

    };

    return Diseases;
}
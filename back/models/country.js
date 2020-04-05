module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('Country',{
        name : {
            type: DataTypes.STRING(30),
            allowNull:false,
            unique:true,
        },
        url : {
            type:DataTypes.TEXT,
            allowNull: false,
        }
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    return Country;

}

'use strict'
/*migration*/

module.exports ={
    up : (queryInterface, Sequelize)=>{
        return queryInterface.createTable('Case', {
            country_name : {
                type: Sequelize.INTEGER(300)
            },
            country_name : {
                type: Sequelize.STRING(100),
            },
           disease_name : {
                type: Sequelize.STRING(100),
           },
           days : {
               type: Sequelize.STRING(100),
           },
           confirmed : {
                type : Sequelize.INTEGER,
           },
           death : {
               type: Sequelize.INTEGER,
           },
           recovered : {
                type: Sequelize.INTEGER,
           },
        })
        .then(()=>{
            return queryInterface.addConstraint('Case',['disease_name','country_name'], {
                type : 'primary key',
                name:'case_pkey'
            });
        })
    }
}
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country_name: {
        type: Sequelize.STRING
      },
      disease_name: {
        type: Sequelize.STRING
      },
      days: {
        type: Sequelize.STRING
      },
      confirmed: {
        type: Sequelize.INTEGER
      },
      death: {
        type: Sequelize.INTEGER
      },
      recovered: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(()=>{
      return queryInterface.addConstraint('Case',['disease_name','country_name'], {
        type : 'primary key',
        name:'case_pkey'
    });
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cases');
  }
};
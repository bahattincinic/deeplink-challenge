'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sections', [{
      name: 'Kadın',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Erkek',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Süpermarket',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Çocuk',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {});
  }
};

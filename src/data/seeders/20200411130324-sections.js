'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sections', [{
      name: 'Women',
      slug: 'women',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Man',
      slug: 'man',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Supermarket',
      slug: 'supermarket',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Child',
      slug: 'child',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {});
  }
};

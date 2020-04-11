'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sections', [{
      name: 'Kadın',
      slug: 'kadin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Erkek',
      slug: 'erkek',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Süpermarket',
      slug: 'supermarket',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Çocuk',
      slug: 'cocuk',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {});
  }
};

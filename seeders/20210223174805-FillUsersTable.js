'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return await queryInterface.bulkInsert('Users', [
     {
       name: 'Pedro',
       age: 22,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: 'Anna',
       age: 23,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: 'Juan',
       age: 30,
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Users'. null, {});
  }
};

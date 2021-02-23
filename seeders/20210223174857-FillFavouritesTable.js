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
      return await queryInterface.bulkInsert('Favourites', [
        {
          userId: '1',
          quizId: '3',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: '2',
          quizId: '4',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: '2',
          quizId: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: '2',
          quizId: '2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: '3',
          quizId: '2',
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
    return await queryInterface.bulkDelete('Favourites', null, {})
  }
};

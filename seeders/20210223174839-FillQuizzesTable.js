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
   return await queryInterface.bulkInsert('Quizzes', [
     {
       question: 'Capital de España',
       answer: "Madrid",
       authorId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      question: 'Capital de Fracia',
      answer: "Paris",
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Capital de Italia',
      answer: "Roma",
      authorId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Capital de Rusia',
      answer: "Moscú",
      authorId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Quizzes', null, {})
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Posts', 'published', {
          allowNUll: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }, { transaction: t }),
        queryInterface.addColumn('Posts', 'publishedAt', {
          allowNUll: false,
          type: Sequelize.DATE
        }, { transaction: t })
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
      await queryInterface.removeColumn('Posts', 'published'),
      await queryInterface.removeColumn('Posts', 'publishedAt')
  }
};

// eslint-disable-next-line import/no-import-module-exports
const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      nome: 'John Doe',
      email: 'John@aa.com.br',
      password_hash: await bcryptjs.hash('John', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      nome: 'John2 Doe',
      email: 'John2@aa.com.br',
      password_hash: await bcryptjs.hash('John2', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      nome: 'John3 Doe',
      email: 'John3@aa.com.br',
      password_hash: await bcryptjs.hash('John3', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  // eslint-disable-next-line no-empty-function
  async down() {},
};

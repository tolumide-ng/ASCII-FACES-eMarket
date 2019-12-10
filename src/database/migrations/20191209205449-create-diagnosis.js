
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Diagnoses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    category_code: {
      type: Sequelize.STRING,
    },
    diagnosis_code: {
      type: Sequelize.STRING,
    },
    full_code: {
      type: Sequelize.STRING,
    },
    abbreviated_code: {
      type: Sequelize.STRING,
    },
    full_description: {
      type: Sequelize.TEXT,
    },
    category_title: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Diagnoses'),
};

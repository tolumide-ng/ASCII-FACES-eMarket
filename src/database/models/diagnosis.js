'use strict';
module.exports = (sequelize, DataTypes) => {
  const Diagnosis = sequelize.define('Diagnosis', {
    category_code: DataTypes.STRING,
    diagnosis_code: DataTypes.STRING,
    full_code: DataTypes.STRING,
    abbreviated_code: DataTypes.STRING,
    full_description: DataTypes.TEXT,
    category_title: DataTypes.STRING
  }, {});
  Diagnosis.associate = function(models) {
    // associations can be defined here
  };
  return Diagnosis;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
  };
  return Tag;
};
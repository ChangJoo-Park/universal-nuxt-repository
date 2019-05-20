'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING
    },
    status: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsToMany(models.Post, { through: 'PostTags', foreignKey: 'tagId' })
  };
  return Tag;
};

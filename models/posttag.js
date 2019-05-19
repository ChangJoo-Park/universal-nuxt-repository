'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    tagId: DataTypes.INTEGER,
    taggable: DataTypes.STRING,
    taggableId: DataTypes.INTEGER
  }, {});
  PostTag.associate = function(models) {
    // associations can be defined here
  };
  return PostTag;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    tagId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  }, {});
  PostTag.associate = function(models) {
    // associations can be defined here
  };
  return PostTag;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
  }, {});
  PostTag.associate = function(models) {
    // associations can be defined here
  };
  return PostTag;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    published: DataTypes.TEXT,
    publishedAt: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  Post.addHook('beforeCreate', (post, options) => {
    if (post.published) {
      post.publishedAt = new Date()
    }
  });

  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User)
    Post.belongsTo(models.Category)
    Post.belongsToMany(models.Tag, { as: 'Tags', through: 'PostTags', foreignKey: 'postId' })
  };
  return Post;
};

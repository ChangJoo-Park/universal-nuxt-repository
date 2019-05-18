'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isPro: DataTypes.BOOLEAN,
    role: DataTypes.ENUM('user', 'admin')
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post)
  };
  return User;
};

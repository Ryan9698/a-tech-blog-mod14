const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class BlogPost extends Model {}

BlogPost.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'blog_post',
    timestamps: false,
  }
);

module.exports = BlogPost;
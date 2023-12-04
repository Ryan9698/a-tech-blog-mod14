const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection.js');
const BlogPost = require('../models/blogPost.js');
const Comment = require('../models/comment.js');

function readJSONFile(filePath) {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}

async function seedDatabase() {
  const seedDataPath = path.join(__dirname, 'blogPost.json');
  const seedData = readJSONFile(seedDataPath);

  try {
    for (const post of seedData) {
      const { title, content, author, comments } = post;

      const createdPost = await BlogPost.create({ title, content, author });

      if (comments && comments.length > 0) {
        for (const commentText of comments) {
          await Comment.create({ comment_text: commentText, blog_post_id: createdPost.id });
        }
      }
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = { seedDatabase };


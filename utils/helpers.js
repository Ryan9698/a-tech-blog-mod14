const Handlebars = require('handlebars');
const moment = require('moment'); 

Handlebars.registerHelper('timeFromNow', (date) => {
  return moment(date).fromNow(); 
});

// {{timeFromNow post.createdAt}} 
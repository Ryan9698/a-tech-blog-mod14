const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { seedDatabase } = require('./seeds/seed.js');

const sequelize = require('./config/connection.js');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sessionStore = new SequelizeStore({
    db: sequelize, 
    expiration: 24 * 60 * 60 * 1000, 
  });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  };

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(async () => {
    try {
      await seedDatabase();
      app.listen(PORT, () => console.log('Now listening'));
    } catch (error) {
      console.error('Error occurred during seeding:', error);
    }
  });
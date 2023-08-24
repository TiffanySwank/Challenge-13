const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }) // Set force to true to reset the database on every server start, if needed
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });

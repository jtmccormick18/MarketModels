const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

//pull in sequelize
const db = require("./models");

//pull in API Routes
require('./routes/api-routes')(app);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
  });
})
(async () => {
  const path = require('path');
  const fs = require('fs');
  const express = require('express');
  const session = require('express-session');
  const passport = require('./auth/passport'); // Path to your passport configuration
  
  const app = express();
  
  // -=-=-=-=-=-=-= to log express
  const morgan = require("morgan");
  app.use(morgan("tiny"));
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-= DB Connection -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  const mongoose = require('mongoose');
  const mongoURI = process.env.mongoURI
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('Connected to MongoDB');

  // Routes
  const {requireLogin} = require('./auth/middleware'); // Path to your passport configuration

  app.use('/apis/login', require('./routers/login'));
  app.use('/apis/logout', require('./routers/logout'));
  app.use('/apis/signup', require('./routers/signup'));
  app.use('/apis/me', requireLogin, require('./routers/me'));


  // app.use('/apis/todos', require('./routers/posttype/todos'));

  const posttypePath = path.join(__dirname, 'routers', 'posttype');
  const posttypeFolders = fs.readdirSync(posttypePath);

  posttypeFolders.forEach((posttypeName) => {
    const indexPath = path.join(posttypePath, posttypeName, 'index.js');
    if (fs.existsSync(indexPath)) {
      app.use(`/apis/${posttypeName}`, require(indexPath));
    }
  });

  
  // app.use('/about',function(req, res) {
  //   res.sendFile(__dirname+'/public/index.html')
  // })
  app.use(express.static('public'))
  
  app.use(function(req, res) {
    res.sendFile(__dirname+'/public/index.html')
  })
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})()
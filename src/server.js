/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import ReactDOM from 'react-dom/server';
import { match } from 'universal-router';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import assets from './assets';
import { port, auth, analytics } from './config';

import Venue from './data/models/Venue';

const app = express();


var yelp = require("node-yelp");

var businesses;
 
 
var client = yelp.createClient({
  oauth: {
    "consumer_key": 'n2wwDnLi8UcVgciuCWPEEQ',
    "consumer_secret": 'z_VPticcs02NF1gEiT6OkQLjdCo',
    "token": '_cMN3ntN-qm-SwjGVRnsOMOIbZEO7Glr',
    "token_secret": '5WXOxaOfa7zCSgnVK8isbdAeOuc'
  },
  
  // Optional settings: 
  httpClient: {
    maxSockets: 25  // ~> Default is 10 
  }
});



//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  getToken: req => req.cookies.id_token,
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
}));
app.use(passport.initialize());




app.get('/search', async (req, res, next) => {

  var passedVariable = req.query.valid;


  try {
    let css = [];
    let statusCode = 200;
    const template = require('./views/index.jade');
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };

    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }

    await match(routes, {
      path: req.path,
      query: req.query,
      context: {
        insertCss: styles => css.push(styles._getCss()),
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        return true;
      },
    });

    res.status(statusCode);

    var arr = passedVariable.split("/*/");

    var links = "";
    for (var k = 0; k < arr.length; k++) {

      var encode = encodeURIComponent(arr[k]);
      encode = '/details?valid=' + encode;

      links += "<a href=" + encode + ">" + arr[k] + "</a>";
      links += "<br>";
    }


    res.send(template(data) + links);
  } catch (err) {
    next(err);
  }
});

app.get('/details', async (req, res, next) => {
  

  var passedVariable = req.query.valid;


  try {
    let css = [];
    let statusCode = 200;
    const template = require('./views/index.jade');
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };

    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }

    await match(routes, {
      path: req.path,
      query: req.query,
      context: {
        insertCss: styles => css.push(styles._getCss()),
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        return true;
      },
    });

    res.status(statusCode);




  Venue.findOne({ 
    where: {name: passedVariable} 
  }).then(function(venues) {

    venues.views += new Date().toString() + "/*/";


    if (venues !== null) {
      var arr = venues.comments.split("/*/");

      venues.save().then(function() {});

      var info = venues.blurb.split("/*/");

      var description = "<div id='detail'><h2>" + venues.name + "</h2>" + "<br>";// + venues.blurb + "<br>";

      description += "<img id='venue_pic'src='" + venues.image + "'>";

      for (var j = 0; j < info.length; j++) {
        if (info[j] === "") {
          continue;
        }
        description += info[j] + "<br>";
      }

      description += "<h3>Comments</h3>";

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "") {
          continue;
        }
        description += arr[i] + "<br>"; 
      }

      description += "<form method='post'><input type='text' name='comment'>" + "<br>" + "<input type='submit' value='Add Comment'></form></div>";

      res.send(template(data) + description);
    }
    
  
  });


  } catch (err) {
    next(err);
  }
});






app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false })
);
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  }
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
    const template = require('./views/index.jade');
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };

    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }

    await match(routes, {
      path: req.path,
      query: req.query,
      context: {
        insertCss: styles => css.push(styles._getCss()),
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        return true;
      },
    });

    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});


var string;

app.set('view engine', 'jade');


app.post('/details', function(req, res) {
  var passedVariable = req.query.valid;


  Venue.findOne({ 
    where: {name: passedVariable} 
  }).then(function(venues) {

    if (venues !== null) {

      venues.comments += req.body.comment + "/*/";

      venues.save().then(function() {});

      res.redirect('back');

    }
    
  });


});



app.post('*', function(req, res, next){

  client.search({
    term: req.body.category,
    location: req.body.zipCode,
    limit: 5
  }).then(function (data) {

    businesses = data.businesses;

    string = '';
    for (var i=0; i < businesses.length; i++) {

      var current = businesses[i];
      console.log(current);

      var info = "";

      for (var j=0; j < current.location.display_address.length; j++) {
        info += current.location.display_address[j] + " ";
      }

      info += "/*/";

      info += current.display_phone + "/*/";

      Venue.create({ name: current.name, image: current.image_url, blurb: info, comments: "", views: ""}).then(function(venue) {
      })

      string += current.name + "/*/";
    }

    string = encodeURIComponent(string);
    res.redirect('/search?valid=' + string);
    

  });

});

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});


function businesses() {
  return string;
}





//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.jade');
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`The server is running at http://localhost:${port}/`);


  });
});



/* eslint-enable no-console */







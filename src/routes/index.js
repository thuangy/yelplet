/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import contact from './contact';
import login from './login';
import register from './register';
import content from './content';
import error from './error';
import details from './details';


/*var models  = require('../data/models');
var express = require('express');
var router  = express.Router();

router.get('/details', function(req, res) {
  models.Venue.findAll({
  }).then(function(venues) {
    res.render('index', {
      title: 'Express',
      venues: venues
    });
  });
});

module.exports = router;*/



export default {

  path: '/',

  children: [
    home,
    contact,
    login,
    register,
    content,
    error,
    details,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};

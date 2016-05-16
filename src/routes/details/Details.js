/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Details.scss';

const title = 'Details';

//import fetch from '../../core/fetch';

//var server = require('../../server.js');

//var server = require('../../core/history.js');

//var server = require('../../../src/server.js');
//console.log(server.businesses);

/*var url = require('url');
var url_parts = url.parse(request.url, true);
var query = url_parts.query;*/

function Details(props, context) {

  //console.log(context);
  //console.log(props);

  /*if(window.localStorage) {
    alert('ls exists');
} else {
    alert('ls does not exist');
}

  var names = localStorage.getItem("names");

  alert(names);*/

  context.setTitle(title);
  return (
    <div className={s.root}>
    </div>
  );
}

Details.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Details);

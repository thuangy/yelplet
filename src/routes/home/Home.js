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
import s from './Home.scss';

const title = 'React Starter Kit';


/*var http = require("http");


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



client.search({
  terms: "Restaurant",
  location: "03062",
  limit: 3
}).then(function (data) {

  businesses = data.businesses;

})*/



/*http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});


    for (var i=0; i < businesses.length; i++) {
      console.log(businesses[i].location.postal_code);
      response.write('' + businesses[i].location.postal_code + '\n');
    }
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');*/





function Home({ news }, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>



      <form id="form" method="post">
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="zipCode">
              ZipCode:
            </label>
            <input
              className={s.input}
              id="zipCode"
              type="number"
              name="zipCode"
              autoFocus
            />
          </div>

          <div className={s.formGroup}>
            <label className={s.label} htmlFor="category">
              Category:
            </label>
            <input
              className={s.input}
              id="category"
              type="text"
              name="category"
              autoFocus
            />
          </div>

          <div className={s.formGroup}>
            <button className={s.button} type="submit">
              Search
            </button>
          </div>

      </form>





        
      </div>
    </div>
  );
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);

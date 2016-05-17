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

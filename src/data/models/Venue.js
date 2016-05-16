/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import DataTypes from 'sequelize';
import Model from '../sequelize';

const Venue = Model.define('Venue', {

  name: {
    type: DataType.STRING(256),
  },

  blurb: {
    type: DataType.STRING()
  },

  comments: {
    type: DataType.STRING()
  },

  views: {
    type: DataType.STRING()
  }

  /*comments: {
    type: DataTypes.ARRAY(DataTypes.STRING()),
  }*/

});

export default Venue;

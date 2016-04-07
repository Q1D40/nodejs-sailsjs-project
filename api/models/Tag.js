/**
* Tag.js
*
* @description :: tag model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      required: true
    }

  }
};


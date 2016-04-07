/**
* Wxauth.js
*
* @description :: wx auth model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    openid: {
      type: 'string',
      unique: true,
      required: true
    },

    accessToken: {
      type: 'string',
      required: true
    },

    refreshToken: {
      type: 'string',
      required: true
    }

  }

};

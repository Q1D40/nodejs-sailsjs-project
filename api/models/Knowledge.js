/**
* Knowledge.js
*
* @description :: knowledge model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    type: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string',
      required: true
    },

    author: {
      type: 'string',
      required: true
    },

    content: {
      type: 'text',
      required: true
    },

    video: {
      type: 'string'
    }

  }

};

/**
* Topic.js
*
* @description :: topic model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment');

module.exports = {

  attributes: {

    doctorId: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string',
      required: true
    },

    thumb: {
      type: 'string',
      required: true
    },

    url: {
      type: 'string',
      required: true
    }

  },

  /**
   * circle topic list
   *
   * @param {Object}   options
   * @param {Function} cb
   */
  getCircleTopicList: function (options, cb) {
    Doctor.find().exec(function (err, doctorData) {
      if (err) return cb(err);
      // if (doctorData.length == 0) return cb(new Error('doctorData is none'));
      var opt = { skip: options.skip, limit: options.limit, sort: 'id DESC' };
      Topic.find(opt).exec(function (err, topicData) {
        if (err) return cb(err);
        var doctorDict = {};
        for (var key in doctorData) {
          doctorDict[doctorData[key].id] = doctorData[key];
        }
        var topicList = topicData;
        for (var key in topicList) {
          topicList[key].pubTime = moment(topicList[key].createdAt, "", "zh-cn").fromNow();
          var doctorInfo = doctorDict[topicList[key].doctorId];
          if (!doctorInfo) doctorInfo = {};
          topicList[key].doctorInfo = doctorInfo;
        }
        return cb(false, topicList);
      });
    });
  }

};

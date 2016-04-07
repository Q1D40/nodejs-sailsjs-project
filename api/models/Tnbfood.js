/**
* Tnbfood.js
*
* @description :: tnb food model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    // 名字
    name: {
      type: 'string',
      unique: true,
      required: true
    },

    // 图片
    img: {
      type: 'string',
      required: true
    },

    // 一份量
    portion: {
      type: 'float',
      required: true
    },

    // 单位
    unit: {
      type: 'string',
      required: true
    },

    // 分类
    category: {
      type: 'string',
      enum: ['蔬菜', '谷薯', '水果', '肉', '豆乳', '油脂'],
      required: true
    }

  }

};


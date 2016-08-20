/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-text-mask',

  init: function(name) {
    this._super.init && this._super.init.apply(this, arguments);
    var assets_path = require('path').join('text-mask-core','dist','textMaskCore.js');
    this.treePaths['vendor'] = require.resolve('text-mask-core').replace(assets_path, '');
  },

  included: function(app) {
    this._super.included.apply(this, arguments);
    app.import('vendor/text-mask-core/dist/textMaskCore.js');
  }
};

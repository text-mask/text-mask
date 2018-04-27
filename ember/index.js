/* eslint-env node */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-text-mask',

  options: {
    babel: {
      plugins: ['transform-object-rest-spread']
    }
  },

  treeForAddon: function(tree) {
    var textMaskPath = path.dirname(require.resolve('text-mask-core/src/index.js'));
    var textMaskTree = this.treeGenerator(textMaskPath);

    var trees = mergeTrees([textMaskTree, tree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
};

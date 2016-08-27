/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-text-mask',

  treeForAddon: function(tree) {
    var textMaskPath = path.dirname(require.resolve('text-mask-core/dist/textMaskCore.js'));
    var textMaskTree = this.treeGenerator(textMaskPath);

    var trees = mergeTrees([textMaskTree, tree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
};

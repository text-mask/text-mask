/* jshint node: true */
'use strict';

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

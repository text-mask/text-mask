/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-text-mask',

  treeForAddon: function(tree) {
    var textMaskAddonsPath = path.dirname(require.resolve('text-mask-core/dist/textMaskCore.js'));
    var textMaskAddonsTree = this.treeGenerator(textMaskAddonsPath);

    var trees = mergeTrees([textMaskAddonsTree, tree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
};

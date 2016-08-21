import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('masked-input', 'Integration | Component | masked input', {
  integration: true
});

test('it renders an input element', function(assert) {
  this.render(hbs`{{masked-input}}`);
  assert.equal(this.$('input').length, 1);
});

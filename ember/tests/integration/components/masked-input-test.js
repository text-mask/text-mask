import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('masked-input', 'Integration | Component | masked input', {
  integration: true
});

test('it renders an input element', function(assert) {
  this.render(hbs`{{masked-input}}`);
  assert.equal(this.$('input').length, 1);
});

test('placeholder attribute can be passed in', function(assert) {
  this.render(hbs`{{masked-input placeholder=placeholder}}`);
  assert.ok( ! this.$('input').attr('placeholder') );

  this.set('placeholder', "Some Placeholder Text");
  assert.equal(this.$('input').attr('placeholder'), 'Some Placeholder Text');
});

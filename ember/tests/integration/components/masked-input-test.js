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

test('mask is initialised on first render', function(assert) {
  this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
  this.set('value', '1234567890');
  this.render(hbs`{{masked-input mask=mask value=value}}`);
  assert.equal(this.$('input')[0].value, '(123) 456-7890');
  assert.equal(this.get('value'), '(123) 456-7890');
});

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

  // assert.equal(this.get('value'), '(123) 456-7890');
  assert.equal(this.get('value'), '1234567890', 'initializing text mask should not change the model');
});

test('renders mask instead of empty string when showMask is true', function(assert) {
  this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
  this.render(hbs`{{masked-input mask=mask value=value showMask=true}}`);
  assert.equal(this.$('input')[0].value, '(___) ___-____');
});

test('does not render mask instead of empty string when showMask is false', function(assert) {
  this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
  this.render(hbs`{{masked-input mask=mask value=value showMask=false}}`);
  assert.equal(this.$('input')[0].value, '');
});

test('mask property can be changed', function(assert) {
  this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
  this.set('value', '1234567890');
  this.render(hbs`{{masked-input mask=mask value=value}}`);
  assert.equal(this.$('input')[0].value, '(123) 456-7890');

  this.set('mask', ['[', /[1-9]/, /\d/, /\d/, ']', '-', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]);
  assert.equal(this.$('input')[0].value, '[123]-456 7890');
});

test('guide property can be changed', function(assert) {
  this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
  this.set('value', '12345');
  this.set('guide', false);
  this.render(hbs`{{masked-input mask=mask guide=guide value=value}}`);
  assert.equal(this.$('input')[0].value, '(123) 45');

  this.set('guide', true);
  assert.equal(this.$('input')[0].value, '(123) 45_-____');
});

test('placeholderChar property can be changed', function(assert) {
  this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
  this.set('value', '12345');

  this.render(hbs`{{masked-input mask=mask placeholderChar=placeholderChar value=value}}`);
  assert.equal(this.$('input')[0].value, '(123) 45_-____');

  this.set('placeholderChar', '*');
  assert.equal(this.$('input')[0].value, '(123) 45*-****');
});

test('pipe method is called', function(assert) {
  assert.expect(2);
  this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
  this.set('value', '(123) 45_-____');
  this.set('pipe', (value) => {
    assert.equal(value, this.get('value'));
    return 'abc';
  });

  this.render(hbs`{{masked-input mask=mask pipe=pipe value=value}}`);
  assert.equal(this.$('input')[0].value, 'abc');
});

test('pipe property can be changed', function(assert) {
  assert.expect(2);
  this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
  this.set('value', '(123) 45_-_6__');
  this.set('pipe', () => {
    return '1';
  });

  this.render(hbs`{{masked-input mask=mask pipe=pipe value=value}}`);
  assert.equal(this.$('input')[0].value, '1');

  this.set('pipe', () => {
    return '2';
  });
  assert.equal(this.$('input')[0].value, '2');
});

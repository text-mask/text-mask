import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | masked input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders an input element', async function(assert) {
    await render(hbs`{{masked-input}}`);
    assert.equal(findAll('input').length, 1);
  });

  test('placeholder attribute can be passed in', async function(assert) {
    await render(hbs`{{masked-input placeholder=placeholder}}`);
    assert.ok(!find('input').getAttribute('placeholder') );

    this.set('placeholder', "Some Placeholder Text");
    assert.equal(find('input').getAttribute('placeholder'), 'Some Placeholder Text');
  });

  test('mask is initialised on first render', async function(assert) {
    this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
    this.set('value', '1234567890');
    await render(hbs`{{masked-input mask=mask value=value}}`);
    assert.equal(this.$('input')[0].value, '(123) 456-7890');

    // assert.equal(this.get('value'), '(123) 456-7890');
    assert.equal(this.get('value'), '1234567890', 'initializing text mask should not change the model');
  });

  test('renders mask instead of empty string when showMask is true', async function(assert) {
    this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
    await render(hbs`{{masked-input mask=mask value=value showMask=true}}`);
    assert.equal(this.$('input')[0].value, '(___) ___-____');
  });

  test('does not render mask instead of empty string when showMask is false', async function(assert) {
    this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
    await render(hbs`{{masked-input mask=mask value=value showMask=false}}`);
    assert.equal(this.$('input')[0].value, '');
  });

  test('mask property can be changed', async function(assert) {
    this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
    this.set('value', '1234567890');
    await render(hbs`{{masked-input mask=mask value=value}}`);
    assert.equal(this.$('input')[0].value, '(123) 456-7890');

    this.set('mask', ['[', /[1-9]/, /\d/, /\d/, ']', '-', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]);
    assert.equal(this.$('input')[0].value, '[123]-456 7890');
  });

  test('guide property can be changed', async function(assert) {
    this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
    this.set('value', '12345');
    this.set('guide', false);
    await render(hbs`{{masked-input mask=mask guide=guide value=value}}`);
    assert.equal(this.$('input')[0].value, '(123) 45');

    this.set('guide', true);
    assert.equal(this.$('input')[0].value, '(123) 45_-____');
  });

  test('placeholderChar property can be changed', async function(assert) {
    this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
    this.set('value', '12345');

    await render(hbs`{{masked-input mask=mask placeholderChar=placeholderChar value=value}}`);
    assert.equal(this.$('input')[0].value, '(123) 45_-____');

    this.set('placeholderChar', '*');
    assert.equal(this.$('input')[0].value, '(123) 45*-****');
  });

  test('pipe method is called', async function(assert) {
    assert.expect(2);
    this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
    this.set('value', '(123) 45_-____');
    this.set('pipe', (value) => {
      assert.equal(value, this.get('value'));
      return 'abc';
    });

    await render(hbs`{{masked-input mask=mask pipe=pipe value=value}}`);
    assert.equal(this.$('input')[0].value, 'abc');
  });

  test('pipe property can be changed', async function(assert) {
    assert.expect(2);
    this.set('mask', ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
    this.set('value', '(123) 45_-_6__');
    this.set('pipe', () => {
      return '1';
    });

    await render(hbs`{{masked-input mask=mask pipe=pipe value=value}}`);
    assert.equal(this.$('input')[0].value, '1');

    this.set('pipe', () => {
      return '2';
    });
    assert.equal(this.$('input')[0].value, '2');
  });
});

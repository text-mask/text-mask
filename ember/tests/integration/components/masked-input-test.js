import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

moduleForComponent('masked-input', 'Integration | Component | masked input', {
  integration: true
});

test('it renders an input element', function(assert) {
  this.render(hbs`{{masked-input}}`);
  assert.equal(this.$('input').length, 1);
});

test('placeholder attribute can be passed in', function(assert) {
  this.set('mask', mask);

  this.render(hbs`{{masked-input mask=mask placeholder=placeholder}}`);
  assert.ok( ! this.$('input').attr('placeholder') );

  this.set('placeholder', "Some Placeholder Text");
  assert.equal(this.$('input').attr('placeholder'), 'Some Placeholder Text');
});

test('attributes can be passed in from the template', function(assert) {
  assert.expect(11);

  const placeholderChar = '_';
  const pipe = function () { return ''; };
  const onReject = function () { return ''; };
  const onAccept = function () { return ''; };

  this.setProperties({
    mask,
    guide: true,
    placeholderChar,
    keepCharPositions: true,
    pipe,
    onReject,
    onAccept,
    createTextMaskInputElement: (config) => {
      assert.ok(config.inputElement);
      assert.equal(config.mask, mask);
      assert.equal(config.guide, true);
      assert.equal(config.placeholderChar, placeholderChar);
      assert.deepEqual(config.keepCharPositions, true);
      assert.deepEqual(config.pipe, pipe);
      assert.equal(typeof config.pipe, 'function');
      assert.deepEqual(config.onReject, onReject);
      assert.equal(typeof config.onReject, 'function');
      assert.deepEqual(config.onAccept, onAccept);
      assert.equal(typeof config.onAccept, 'function');
    }
  });

  this.render(hbs`
    {{masked-input
      mask=mask
      guide=guide
      placeholderChar=placeholderChar
      keepCharPositions=keepCharPositions
      pipe=pipe
      onReject=onReject
      onAccept=onAccept
      createTextMaskInputElement=createTextMaskInputElement}}
  `);
});

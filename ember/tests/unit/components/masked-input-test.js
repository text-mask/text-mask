import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('masked-input', 'Unit | Component | masked input', {
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('mask should not be undefined', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.render();

  component.get('textMaskInputElement').update('a');
  assert.ok(component);
});

test('mask defaults to an empty array', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.render();

  assert.deepEqual(component.get('mask'), []);
});

test('textMaskInputElement property is initialized', function(assert) {
  assert.expect(4);
  var component = this.subject();
  this.render();

  const textMaskInputElement = component.get('textMaskInputElement');
  assert.equal(typeof textMaskInputElement, 'object');
  assert.equal(typeof textMaskInputElement.state, 'object');
  assert.equal(typeof textMaskInputElement.state.previousConformedValue, 'string');
  assert.equal(typeof textMaskInputElement.update, 'function');
});

test('createTextMaskInputElement() is called on render with the correct config', function(assert) {
  assert.expect(7);

  let mask = [/\d/];
  let guide = true;
  let placeholderChar = true;
  let keepCharPositions = true;
  let showMask = true;
  let pipe = () => {};

  this.subject({
    mask,
    guide,
    placeholderChar,
    keepCharPositions,
    pipe,
    showMask,
    createTextMaskInputElement: (config) => {
      assert.deepEqual(config.mask, mask);
      assert.equal(config.guide, guide);
      assert.equal(config.placeholderChar, placeholderChar);
      assert.equal(config.keepCharPositions, keepCharPositions);
      assert.deepEqual(config.pipe, pipe);
      assert.deepEqual(typeof config.inputElement, 'object');
      assert.equal(config.showMask, showMask);
      return {
        update(){}
      };
    }
  });
  this.render();
});

test('changing config calls createTextMaskInputElement()', function(assert) {
  assert.expect(6);

  let config = {
    mask: [/\d/],
    guide: undefined,
    placeholderChar: undefined,
    keepCharPositions: undefined,
    pipe: undefined
  };

  let component = this.subject({
    createTextMaskInputElement() {
      return {
        update(){}
      };
    }
  });
  this.render();

  component.createTextMaskInputElement = (_config) => {
    assert.deepEqual(_config.mask, config.mask);
    assert.equal(typeof config.guide, "undefined");
    assert.equal(typeof config.placeholderChar, "undefined");
    assert.equal(typeof config.keepCharPositions, "undefined");
    assert.deepEqual(typeof config.pipe, "undefined");
    assert.deepEqual(typeof config.inputElement, 'object', 'inputElement should be an object');
    return {
      update(){}
    };
  };

  component.set('config', config);
  component.update();
});

test('createTextMaskInputElement is a function', function(assert) {
  assert.expect(1);
  let component = this.subject();
  assert.equal(typeof component.createTextMaskInputElement, 'function');
});

test('update() method is called when component is rendered', function(assert) {
  assert.expect(1);

  this.subject({
    _textMaskInputElementChanged(){},
    update: () => assert.ok(true)
  });

  this.render();
});

test('update() method calls textMaskInputElement.update()', function(assert) {
  assert.expect(1);

  let component = this.subject({
    textMaskInputElement: {
      update: () => assert.ok(true)
    }
  });

  component.update();
});

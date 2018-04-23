import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | input mask', function(hooks) {
  setupApplicationTest(hooks);

  test('masked-input works', async function(assert) {
    await visit('/');
    await fillIn('.masked-input > input', '123');
    assert.equal(find('span.output:first').text(), '(123) ___-____');
  });

  test('does not allow masked characters', async function(assert) {
    await visit('/');
    await fillIn('.masked-input > input', 'abc');
    assert.equal(find('span.output:first').text(), '(___) ___-____');
  });
});
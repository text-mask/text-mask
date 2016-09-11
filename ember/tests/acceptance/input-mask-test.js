import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | input mask');

test('masked-input works', function(assert) {
  visit('/');
  fillIn('.masked-input > input', '123');
  andThen(function() {
    assert.equal(find('span.output:first').text(), '(123) ___-____');
  });
});

test('does not allow masked characters', function(assert) {
  visit('/');
  fillIn('.masked-input > input', 'abc');
  andThen(function() {
    assert.equal(find('span.output:first').text(), '(___) ___-____');
  });
});

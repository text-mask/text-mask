import conformToMask from '../src/conformToMask.js'
import dynamicTests from 'mocha-dynamic-tests'
import chai from 'chai'

const expect = chai.expect

describe('conformToMask', () => {
  //dynamicTests([], (test) => ({
  //  description: `knows for userInput: ${test.input.userInput} and mask ${test.input.mask}, to ` +
  //  `output ${JSON.stringify(test.output)}`,
  //  body: () => {
  //    expect(assignUserInputToMaskPositions(
  //      test.input.userInput,
  //      test.input.mask
  //    )).to.deep.equal(test.output)
  //  }
  //}))

  dynamicTests([{
    userInput: '(123 ___-____',
    mask: '(111) 111-1111',
    expected: '(12_) ___-____',
    skip: true
  }, {
    userInput: '1__/__/____',
    mask: '11/11/1111',
    expected: '1_/__/____',
  }, {
    userInput: '11_/__/____',
    mask: '11/11/1111',
    expected: '11/__/____',
  }, {
    userInput: '1111',
    mask: '11/11/1111',
    expected: '11/11/____',
  }, {
    userInput: '1111',
    mask: '11/11/1111',
    expected: '11/11/____',
  }, {
    userInput: '23840957',
    mask: '11/11/1111',
    expected: '23/84/0957',
  }, {
    userInput: '2384095',
    mask: '11/11/1111',
    expected: '23/84/095_',
  }, {
    userInput: '2',
    mask: '11/11',
    expected: '2_/__'
  }, {
    userInput: '777',
    mask: '(111) 111-1111',
    expected: '(777) ___-____',
  }, {
    userInput: '7771',
    mask: '(111) 111-1111',
    expected: '(777) 1__-____',
  }, {
    userInput: '1_/__/___1_',
    mask: '11/11/1111',
    expected: '1_/__/___1',
    //only: true
  }, {
    userInput: '1_/1__/___1',
    mask: '11/11/1111',
    expected: '1_/1_/____',
    //only: true
  }, {
    userInput: '(d1__) ___-____',
    mask: '(111) 111-1111',
    expected: '(1__) ___-____',
  }, {
    userInput: '12/32',
    mask: '11/11',
    expected: '12/32',
  }, {
    userInput: '__/32',
    mask: '11/11',
    expected: '__/32',
  }, {
    userInput: '1__/__/____',
    mask: '11/11/1111',
    expected: '1_/__/____',
  }, {
    userInput: '2/2_',
    mask: '11/11',
    expected: '22/__',
  }, {
    userInput: '(22) 2__-____',
    mask: '(111) 111-1111',
    expected: '(222) ___-____',
  }, {
    userInput: '_2_/2_',
    mask: '11/11',
    expected: '_2/_2',
    //only: true
  }, {
    userInput: '_/2_',
    mask: '11/11',
    expected: '_2/__',
  }, {
    userInput: '1',
    mask: '(',
    expected: '('
  }, {
    userInput: '2',
    mask: '1',
    expected: '2',
  }, {
    userInput: '__/22',
    mask: '11/11',
    expected: '__/22',
  }, {
    userInput: '2__/22',
    mask: '11/11',
    expected: '2_/_2',
  }, {
    userInput: '22',
    mask: '11/11',
    expected: '22/__',
  }, {
    userInput: '222',
    mask: '11/11',
    expected: '22/2_',
  }, {
    userInput: '777777',
    mask: '11/11',
    expected: '77/77',
  }, {
    userInput: '222/1',
    mask: '11/11',
    expected: '22/21',
    //only: true
  }, {
    userInput: '__5/__',
    mask: '11/11',
    expected: '__/5_',
  }, {
    userInput: '8_/4_5/222_1',
    mask: '11/11/1111',
    expected: '8_/4_/5222',
    //only: true
  }, {
    userInput: '8293847/4_2/222_1',
    mask: '11/11/1111',
    expected: '82/93/8474',
  }, {
    userInput: '777',
    mask: '(111) 111-1111',
    expected: '(777) ___-____',
  }, {
    userInput: '0/22',
    mask: '11/11',
    expected: '02/2_',
  }, {
    userInput: '/22',
    mask: '11/11',
    expected: '22/__',
  }, {
    userInput: '22/3/995',
    mask: '11/11/1111',
    expected: '22/39/95__',
  }, {
    userInput: '2d',
    mask: '11',
    expected: '2_'
  }], (test) => ({
    description: `for userInput ${test.userInput} and mask ${test.mask}, outputs ${test.expected}`,

    body: () => {
      expect(conformToMask(test.userInput, test.mask).output).to.equal(test.expected)
    }
  }))
})

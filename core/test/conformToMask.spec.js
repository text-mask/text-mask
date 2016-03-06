import conformToMask from '../src/conformToMask.js'
import dynamicTests from 'mocha-dynamic-tests'
import chai from 'chai'
import testParameters from './testParameters.js'

const expect = chai.expect

describe('conformToMask', () => {
  dynamicTests(
    testParameters,

    (test) => ({
      description: `for userInput ${
        test.input.userModifiedInputFieldValue
      } and mask ${test.input.mask}, outputs ${test.output.conformedInputFieldValue}`,

      body: () => {
        expect(conformToMask(
          test.input.userModifiedInputFieldValue,
          test.input.mask
        ).output).to.equal(test.output.conformedInputFieldValue)
      }
    })
  )
})

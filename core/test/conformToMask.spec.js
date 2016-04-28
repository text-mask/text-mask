import packageJson from '../package.json'
import isVerify from '../../common/isVerify.js'
import dynamicTests from 'mocha-dynamic-tests'
import chai from 'chai'
import testParameters from './../../common/testParameters.js'

const conformToMask = (isVerify()) ?
  require(`../${packageJson.main}`).conformToMask :
  require('../src/conformToMask.js').default

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

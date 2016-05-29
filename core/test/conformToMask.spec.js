import packageJson from '../package.json'
import isVerify from '../../common/isVerify.js'
import dynamicTests from 'mocha-dynamic-tests'
import chai from 'chai'
import testParameters, {
  noGuideMode,
  acceptedCharInMask,
  allowMaskingCharInMask
} from './../../common/testParameters.js'

const conformToMask = (isVerify()) ?
  require(`../${packageJson.main}`).conformToMask :
  require('../src/conformToMask.js').default

const expect = chai.expect

describe('conformToMask', () => {
  describe('Guide mode tests', () => {
    dynamicTests(
      testParameters,

      (test) => ({
        description: `for input ${JSON.stringify(test.input)}, ` +
        `it outputs '${test.output.conformedInputFieldValue}'`,

        body: () => {
          expect(conformToMask(
            test.input.userModifiedInputFieldValue,
            test.input.mask,
            {previousConformedInput: test.input.startingInputFieldValue}
          ).output).to.equal(test.output.conformedInputFieldValue)
        }
      })
    )
  })

  describe('No guide mode', () => {
    dynamicTests(
      noGuideMode,

      (test) => ({
        description: `for input ${JSON.stringify(test.input)}, ` +
        `it outputs '${test.output.conformedInputFieldValue}'`,

        body: () => {
          expect(conformToMask(
            test.input.userModifiedInputFieldValue,
            test.input.mask,
            {guide: false, previousConformedInput: test.input.startingInputFieldValue}
          ).output).to.equal(test.output.conformedInputFieldValue)
        }
      })
    )
  })

  describe('Accepted character in mask', () => {
    dynamicTests(
      acceptedCharInMask,

      (test) => ({
        description: `for input ${JSON.stringify(test.input)}, ` +
        `it outputs '${test.output.conformedInputFieldValue}'`,

        body: () => {
          expect(conformToMask(
            test.input.userModifiedInputFieldValue,
            test.input.mask,
            {guide: true, previousConformedInput: test.input.startingInputFieldValue}
          ).output).to.equal(test.output.conformedInputFieldValue)
        }
      })
    )
  })

  describe('Allow masking character in mask', () => {
    dynamicTests(
      allowMaskingCharInMask,

      (test) => ({
        description: `for input ${JSON.stringify(test.input)}, ` +
        `it outputs '${test.output.conformedInputFieldValue}'`,

        body: () => {
          expect(conformToMask(
            test.input.userModifiedInputFieldValue,
            test.input.mask,
            {guide: true, previousConformedInput: test.input.startingInputFieldValue}
          ).output).to.equal(test.output.conformedInputFieldValue)
        }
      })
    )
  })
})

import packageJson from '../package.json'
import requireForTest from '../../common/requireForTest.js'
import dynamicTests from 'mocha-dynamic-tests'
import chai from 'chai'
import testParameters from './testParameters.js'

const conformToMask = requireForTest(
  __dirname + '/../src/conformToMask.js',
  require(`../${packageJson.main}`).conformToMask
)

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

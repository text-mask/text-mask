import chai from 'chai'
import getChangeDetails from '../src/getChangeDetails.js'
import dynamicTests from 'mocha-dynamic-tests'
import testParameters from './../../common/testParameters.js'
import _ from 'lodash'

const expect = chai.expect

describe('getChangeDetails', () => {
  describe('indexOfLastChange', () => {
    const indexOfLastChangeTestParams = _.filter(
      testParameters,
      testParameter => (
        testParameter.output.indexOfLastAddedCharacter !== undefined &&
        testParameter.output.indexOfLastAddedCharacter !== null
      )
    )

    dynamicTests(
      indexOfLastChangeTestParams,

      (test) => ({
        description: JSON.stringify(test),
        body: () => {
          expect(getChangeDetails(
            test.input.startingInputFieldValue,
            test.output.conformedInputFieldValue
          ).indexOfLastChange).to.equal(test.output.indexOfLastAddedCharacter)
        }
      })
    )
  })

  describe('indexOfFirstChange', () => {
    const indexOfFirstChangeTestParams = _.filter(
      testParameters,
      (testParameter) => testParameter.output.indexOfFirstRemovedCharacter !== undefined
    )

    dynamicTests(
      indexOfFirstChangeTestParams,

      (test) => ({
        description: JSON.stringify(test),

        body: () => {
          expect(getChangeDetails(
            test.input.startingInputFieldValue,
            test.output.conformedInputFieldValue
          ).indexOfFirstChange).to.equal(test.output.indexOfFirstRemovedCharacter)
        }
      })

      //}),
      //  {only: true}
    )
  })
})

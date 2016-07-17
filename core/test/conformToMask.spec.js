import testParameters, {
  noGuideMode,
  acceptedCharInMask,
  allowMaskingCharInMask
} from './../../common/testParameters.js'
import keepCharPositionsTests from '../../common/keepCharPositionsTests.js'
import packageJson from '../package.json'
import {convertMaskToPlaceholder} from '../src/utilities.js'
import {placeholderChar} from '../src/constants.js'

const conformToMask = (isVerify()) ?
  require(`../${packageJson.main}`).conformToMask :
  require('../src/conformToMask.js').default

describe('conformToMask', () => {
  describe('Guide mode tests', () => {
    dynamicTests(
      testParameters,

      (test) => ({
        description: `for input ${JSON.stringify(test.input)}, ` +
        `it outputs '${test.output.conformedValue}'`,

        body: () => {
          expect(conformToMask(
            test.input.rawValue,
            test.input.mask,
            {
              previousConformedValue: test.input.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.input.mask, placeholderChar),
              currentCaretPosition: test.input.currentCaretPosition
            }
          ).conformedValue).to.equal(test.output.conformedValue)
        }
      })
    )
  })

  describe('No guide mode', () => {
    dynamicTests(
      noGuideMode,

      (test) => ({
        description: `for input ${JSON.stringify(test.input)}, ` +
        `it outputs '${test.output.conformedValue}'`,

        body: () => {
          expect(conformToMask(
            test.input.rawValue,
            test.input.mask,
            {
              guide: false,
              previousConformedValue: test.input.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.input.mask, placeholderChar),
              currentCaretPosition: test.input.currentCaretPosition
            }
          ).conformedValue).to.equal(test.output.conformedValue)
        }
      })
    )
  })

  describe('Accepted character in mask', () => {
    dynamicTests(
      acceptedCharInMask,

      (test) => ({
        description: `for input ${JSON.stringify(test.input)}, ` +
        `it outputs '${test.output.conformedValue}' Line: ${test.line}`,

        body: () => {
          expect(conformToMask(
            test.input.rawValue,
            test.input.mask,
            {
              guide: true,
              previousConformedValue: test.input.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.input.mask, placeholderChar),
              currentCaretPosition: test.input.currentCaretPosition
            }
          ).conformedValue).to.equal(test.output.conformedValue)
        }
      })
    )
  })

  describe('Allow masking character in mask', () => {
    dynamicTests(
      allowMaskingCharInMask,

      (test) => ({
        description: `for input ${JSON.stringify(test.input)}, ` +
        `it outputs '${test.output.conformedValue}'`,

        body: () => {
          expect(conformToMask(
            test.input.rawValue,
            test.input.mask,
            {
              guide: true,
              previousConformedValue: test.input.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.input.mask, placeholderChar),
              currentCaretPosition: test.input.currentCaretPosition
            }
          ).conformedValue).to.equal(test.output.conformedValue)
        }
      })
    )
  })

  describe('keepCharPositionsTests', () => {
    dynamicTests(
      keepCharPositionsTests,

      (test) => ({
        description: `for input ${JSON.stringify(test.input)}, ` +
        `it outputs '${test.output.conformedValue}' Line: ${test.line}`,

        body: () => {
          expect(conformToMask(
            test.input.rawValue,
            test.input.mask,
            {
              guide: true,
              previousConformedValue: test.input.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.input.mask, placeholderChar),
              keepCharPositions: true,
              currentCaretPosition: test.input.currentCaretPosition
            }
          ).conformedValue).to.equal(test.output.conformedValue)
        }
      })
    )
  })
})

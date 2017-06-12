import _ from 'lodash'
import testParameters, {
  noGuideMode,
  acceptedCharInMask,
  escapedMaskChar
} from './../../common/testParameters.js'
import keepCharPositionsTests from '../../common/keepCharPositionsTests'
import maskFunctionTests from '../../common/maskFunctionTests'
import packageJson from '../package.json'
import {convertMaskToPlaceholder} from '../src/utilities'
import {placeholderChar} from '../src/constants'

const conformToMask = (isVerify()) ?
  require(`../${packageJson.main}`).conformToMask :
  require('../src/conformToMask.js').default

const testInputs = ['rawValue', 'mask', 'previousConformedValue', 'currentCaretPosition']

describe('conformToMask', () => {
  describe('Accepted character in mask', () => {
    dynamicTests(
      _.filter(acceptedCharInMask, test => !test.skip),

      (test) => ({
        description: `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
        `it outputs '${test.conformedValue}' Line: ${test.line}`,

        body: () => {
          expect(conformToMask(test.rawValue, test.mask, {
            guide: true,
            previousConformedValue: test.previousConformedValue,
            placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
            currentCaretPosition: test.currentCaretPosition
          }).conformedValue).to.equal(test.conformedValue)
        }
      })
    )
  })

  describe('Guide mode tests', () => {
    dynamicTests(
      testParameters,

      (test) => ({
        description: `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
        `it outputs '${test.conformedValue}' Line: ${test.line}`,

        body: () => {
          expect(conformToMask(
            test.rawValue,
            test.mask,
            {
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              currentCaretPosition: test.currentCaretPosition
            }
          ).conformedValue).to.equal(test.conformedValue)
        }
      })
    )
  })

  describe('No guide mode', () => {
    dynamicTests(
      noGuideMode,

      (test) => ({
        description: `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
        `it outputs '${test.conformedValue}'`,

        body: () => {
          expect(conformToMask(
            test.rawValue,
            test.mask,
            {
              guide: false,
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              currentCaretPosition: test.currentCaretPosition
            }
          ).conformedValue).to.equal(test.conformedValue)
        }
      })
    )
  })

  describe('Allow escaped masking character in mask', () => {
    dynamicTests(
      escapedMaskChar,

      (test) => ({
        description: `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
        `it outputs '${test.conformedValue}'`,

        body: () => {
          expect(conformToMask(
            test.rawValue,
            test.mask,
            {
              guide: true,
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              currentCaretPosition: test.currentCaretPosition
            }
          ).conformedValue).to.equal(test.conformedValue)
        }
      })
    )
  })

  describe('keepCharPositionsTests', () => {
    dynamicTests(
      keepCharPositionsTests,

      (test) => ({
        description: `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
        `it outputs '${test.conformedValue}' Line: ${test.line}`,

        body: () => {
          expect(conformToMask(
            test.rawValue,
            test.mask,
            {
              guide: true,
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              keepCharPositions: true,
              currentCaretPosition: test.currentCaretPosition
            }
          ).conformedValue).to.equal(test.conformedValue)
        }
      })
    )
  })

  describe('Mask function', () => {
    dynamicTests(
      maskFunctionTests,

      (test) => ({
        description: `for input ${JSON.stringify(_.pick(test, testInputs))}, ` +
        `it outputs '${test.conformedValue}' Line: ${test.line}`,

        body: () => {
          expect(conformToMask(
            test.rawValue,
            test.mask,
            {
              guide: true,
              previousConformedValue: test.previousConformedValue,
              placeholder: convertMaskToPlaceholder(test.mask, placeholderChar),
              currentCaretPosition: test.currentCaretPosition
            }
          ).conformedValue).to.equal(test.conformedValue)
        }
      })
    )
  })
})

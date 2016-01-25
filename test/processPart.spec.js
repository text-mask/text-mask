import chai from 'chai'
import processPart from '../src/processPart.js'
import {convertPatternToPlaceholder} from '../src/utilities.js'

const expect = chai.expect

describe('processPart', () => {
  const acceptedLength = 3

  ;[
    {input: '1', output: '1__', remainder: ''},
    {input: '1___', output: '1__', remainder: ''},
    {input: '_1__', output: '_1_', remainder: ''},
    {input: '1_1_', output: '1_1', remainder: ''},
    {input: '1_1__', output: '1_1', remainder: ''},
    {input: '11_', output: '11_', remainder: ''},
    {input: '1___1', output: '1_1', remainder: ''},
    {input: '___1', output: '__1', remainder: ''},
    {input: '111', output: '111', remainder: ''},
    {input: '___1111', output: '111', remainder: '1'}
  ].map((test) => {
    it(
      `transforms ${test.input} to ${test.output} with remainder ${test.remainder || '[empty]'}`,
      () => {
      expect(processPart(test.input, acceptedLength)).to.deep.equal({
        results: test.output,
        remainder: test.remainder
      })
    })
  })
})

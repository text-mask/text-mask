import assignUserInputToPatternPositions from '../src/assignUserInputToPatternPositions.js'
import chai from 'chai'

const expect = chai.expect

describe('assignUserInputToPatternPositions', () => {
  it('returns an array', () => {
    expect(
      assignUserInputToPatternPositions()
    ).to.be.an('array')
  })

  ;[
    {input: {userInput: '12/32', pattern: '11/11'}, output: [
      {character: '1', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '3', position: 0, area: 1},
      {character: '2', position: 1, area: 1},
    ]},

    {input: {userInput: '__/32', pattern: '11/11'}, output: [
      {character: '3', position: 0, area: 1},
      {character: '2', position: 1, area: 1},
    ]},

    {input: {userInput: '1__/__/____', pattern: '11/11/1111'}, output: [
      {character: '1', position: 0, area: 0}
    ]},

    {input: {userInput: '2/2_', pattern: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0}
    ]},

    {input: {userInput: '(22) 2__-____', pattern: '(111) 111-1111'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '2', position: 2, area: 0}
    ]},

    {input: {userInput: '_2_/2_', pattern: '11/11'}, output: [
      {character: '2', position: 1, area: 0},
      {character: '2', position: 1, area: 1}
    ]},

    {input: {userInput: '_/2_', pattern: '11/11'}, output: [
      {character: '2', position: 1, area: 0}
    ]},

    {input: {userInput: '1', pattern: '('}, output:[]},

    {input: {userInput: '2', pattern: '1'}, output: [
      {character: '2', position: 0, area: 0}
    ]},

    {input: {userInput: '__/22', pattern: '11/11'}, output: [
      {character: '2', position: 0, area: 1},
      {character: '2', position: 1, area: 1}
    ]},

    {input: {userInput: '2__/22', pattern: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 1},
    ]},

    {input: {userInput: '22', pattern: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
    ]},

    {input: {userInput: '222', pattern: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '2', position: 0, area: 1},
    ]},

    {input: {userInput: '777777', pattern: '11/11'}, output: [
      {character: '7', position: 0, area: 0},
      {character: '7', position: 1, area: 0},
      {character: '7', position: 0, area: 1},
      {character: '7', position: 1, area: 1}
    ]},

    {input: {userInput: '222/1', pattern: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '2', position: 0, area: 1},
      {character: '1', position: 1, area: 1}
    ]},

    {input: {userInput: '__5/__', pattern: '11/11'}, output: [
      {character: '5', position: 0, area: 1}
    ]},

    {input: {userInput: '8_/4_5/222_1', pattern: '11/11/1111'}, output: [
      {character: '8', position: 0, area: 0},
      {character: '4', position: 0, area: 1},
      {character: '5', position: 0, area: 2},
      {character: '2', position: 1, area: 2},
      {character: '2', position: 2, area: 2},
      {character: '2', position: 3, area: 2},
    ]},

    {input: {userInput: '8293847/4_2/222_1', pattern: '11/11/1111'}, output: [
      {character: '8', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '9', position: 0, area: 1},
      {character: '3', position: 1, area: 1},
      {character: '8', position: 0, area: 2},
      {character: '4', position: 1, area: 2},
      {character: '7', position: 2, area: 2},
      {character: '4', position: 3, area: 2}
    ]},

    {input: {userInput: '777', pattern: '(111) 111-1111'}, output: [
      {character: '7', position: 0, area: 0},
      {character: '7', position: 1, area: 0},
      {character: '7', position: 2, area: 0},
    ]},

    {input: {userInput: '0/22', pattern: '11/11'}, output: [
      {character: '0', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '2', position: 0, area: 1},
    ]},

    {input: {userInput: '/22', pattern: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
    ]},

    {input: {userInput: '22/3/995', pattern: '11/11/1111'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '3', position: 0, area: 1},
      {character: '9', position: 1, area: 1},
      {character: '9', position: 0, area: 2},
      {character: '5', position: 1, area: 2},
    ]}
  ].map((test) => {
    //if (!test.only) { return }

    it(`knows for userInput: ${test.input.userInput} and pattern ${test.input.pattern}, to ` +
       `output ${JSON.stringify(test.output)}`, () => {
      expect(assignUserInputToPatternPositions(
        test.input.userInput,
        test.input.pattern
      )).to.deep.equal(test.output)
    })
  })
})

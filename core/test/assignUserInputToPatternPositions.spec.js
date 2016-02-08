import assignUserInputToMaskPositions from '../src/assignUserInputToMaskPositions.js'
import chai from 'chai'

const expect = chai.expect

describe('assignUserInputToMaskPositions', () => {
  it('returns an array', () => {
    expect(
      assignUserInputToMaskPositions()
    ).to.be.an('array')
  })

  ;[
    {input: {userInput: '12/32', mask: '11/11'}, output: [
      {character: '1', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '3', position: 0, area: 1},
      {character: '2', position: 1, area: 1},
    ]},

    {input: {userInput: '__/32', mask: '11/11'}, output: [
      {character: '3', position: 0, area: 1},
      {character: '2', position: 1, area: 1},
    ]},

    {input: {userInput: '1__/__/____', mask: '11/11/1111'}, output: [
      {character: '1', position: 0, area: 0}
    ]},

    {input: {userInput: '2/2_', mask: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0}
    ]},

    {input: {userInput: '(22) 2__-____', mask: '(111) 111-1111'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '2', position: 2, area: 0}
    ]},

    {input: {userInput: '_2_/2_', mask: '11/11'}, output: [
      {character: '2', position: 1, area: 0},
      {character: '2', position: 1, area: 1}
    ]},

    {input: {userInput: '_/2_', mask: '11/11'}, output: [
      {character: '2', position: 1, area: 0}
    ]},

    {input: {userInput: '1', mask: '('}, output:[]},

    {input: {userInput: '2', mask: '1'}, output: [
      {character: '2', position: 0, area: 0}
    ]},

    {input: {userInput: '__/22', mask: '11/11'}, output: [
      {character: '2', position: 0, area: 1},
      {character: '2', position: 1, area: 1}
    ]},

    {input: {userInput: '2__/22', mask: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 1},
    ]},

    {input: {userInput: '22', mask: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
    ]},

    {input: {userInput: '222', mask: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '2', position: 0, area: 1},
    ]},

    {input: {userInput: '777777', mask: '11/11'}, output: [
      {character: '7', position: 0, area: 0},
      {character: '7', position: 1, area: 0},
      {character: '7', position: 0, area: 1},
      {character: '7', position: 1, area: 1}
    ]},

    {input: {userInput: '222/1', mask: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '2', position: 0, area: 1},
      {character: '1', position: 1, area: 1}
    ]},

    {input: {userInput: '__5/__', mask: '11/11'}, output: [
      {character: '5', position: 0, area: 1}
    ]},

    {input: {userInput: '8_/4_5/222_1', mask: '11/11/1111'}, output: [
      {character: '8', position: 0, area: 0},
      {character: '4', position: 0, area: 1},
      {character: '5', position: 0, area: 2},
      {character: '2', position: 1, area: 2},
      {character: '2', position: 2, area: 2},
      {character: '2', position: 3, area: 2},
    ]},

    {input: {userInput: '8293847/4_2/222_1', mask: '11/11/1111'}, output: [
      {character: '8', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '9', position: 0, area: 1},
      {character: '3', position: 1, area: 1},
      {character: '8', position: 0, area: 2},
      {character: '4', position: 1, area: 2},
      {character: '7', position: 2, area: 2},
      {character: '4', position: 3, area: 2}
    ]},

    {input: {userInput: '777', mask: '(111) 111-1111'}, output: [
      {character: '7', position: 0, area: 0},
      {character: '7', position: 1, area: 0},
      {character: '7', position: 2, area: 0},
    ]},

    {input: {userInput: '0/22', mask: '11/11'}, output: [
      {character: '0', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '2', position: 0, area: 1},
    ]},

    {input: {userInput: '/22', mask: '11/11'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
    ]},

    {input: {userInput: '22/3/995', mask: '11/11/1111'}, output: [
      {character: '2', position: 0, area: 0},
      {character: '2', position: 1, area: 0},
      {character: '3', position: 0, area: 1},
      {character: '9', position: 1, area: 1},
      {character: '9', position: 0, area: 2},
      {character: '5', position: 1, area: 2},
    ]}
  ].map((test) => {
    //if (!test.only) { return }

    it(`knows for userInput: ${test.input.userInput} and mask ${test.input.mask}, to ` +
       `output ${JSON.stringify(test.output)}`, () => {
      expect(assignUserInputToMaskPositions(
        test.input.userInput,
        test.input.mask
      )).to.deep.equal(test.output)
    })
  })
})

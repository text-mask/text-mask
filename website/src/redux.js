import find from 'lodash/fp/find'
import choices from './choices'
import {textMaskProps} from './constants'
import {createAction, handleActions} from 'redux-actions'

export const actionCreators = {
  setMask: createAction('setMask'),
  setGuide: createAction('setGuide'),
  setKeepCharPositions: createAction('setKeepCharPositions'),
  setPlaceholderChar: createAction('setPlaceholderChar'),
  populateFromChoice: createAction('populateFromChoice'),
  setValue: createAction('setValue'),
}

function stringifyMask(mask) {
  return mask.map((part) => part.toString())
}

const initialState = {
  value: '',
  placeholderChar: '\u2000',
  guide: true,
  keepCharPositions: false,
  ...choices[0],
  mask: stringifyMask(choices[0].mask),
}

export function isMaskFunction(state) {
  return (
    typeof state.mask === 'function' ||
    (typeof state.mask === 'object' && !(state.mask instanceof Array))
  )
}

const numberMaskStyle = {textAlign: 'right'}
const emptyStyle = {}

export function getTextMaskComponentStyle(state) {
  return state.mask.instanceOf === 'createNumberMask' ?
    numberMaskStyle :
    emptyStyle
}

export function getTextMaskComponentUniqueKey(state) {
  return JSON.stringify([...textMaskProps, 'name'].map((prop) => state[prop]))
}

export const reducer = handleActions(
  {
    [actionCreators.setMask.toString()]: (state, action) => ({
      ...state,
      mask: stringifyMask(action.payload),
    }),
    [actionCreators.setGuide.toString()]: (state, action) => ({
      ...state,
      guide: action.payload,
    }),
    [actionCreators.setKeepCharPositions.toString()]: (state, action) => ({
      ...state,
      keepCharPositions: action.payload,
    }),
    [actionCreators.setPlaceholderChar.toString()]: (state, action) => ({
      ...state,
      placeholderChar: action.payload,
    }),
    [actionCreators.populateFromChoice.toString()]: (state, action) => {
      const choice = find({name: action.payload})(choices)

      return {
        ...initialState,
        ...choice,
        mask: stringifyMask(choice.mask),
        shouldFocusMaskedInput: true,
      }
    },
    [actionCreators.setValue.toString()]: (state, action) => ({
      ...state,
      value: action.payload,
    }),
  },
  initialState
)

export const selectors = {
  getTextMaskComponentUniqueKey,
  getTextMaskComponentStyle,
  isMaskFunction,
}

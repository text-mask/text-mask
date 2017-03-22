import find from 'lodash/fp/find'
import pick from 'lodash/fp/pick'
import choices from './choices'
import {textMaskProps} from './constants'
import {createAction, handleActions} from 'redux-actions'

export const actionCreators = {
  setMask: createAction('setMask'),
  setGuide: createAction('setGuide'),
  setKeepCharPositions: createAction('setKeepCharPositions'),
  setPlaceholderChar: createAction('setPlaceholderChar'),
  populateFromChoice: createAction('populateFromChoice'),
  setValue: createAction('setValue')
}

const initialState = {
  value: '',
  mask: '',
  placeholderChar: '\u2000',
  guide: true,
  keepCharPositions: false,
  ...choices[0]
}

export const reducer = handleActions({
  [actionCreators.setMask]: (state, action) => ({...state, mask: action.payload}),
  [actionCreators.setGuide]: (state, action) => ({...state, guide: action.payload}),
  [actionCreators.setKeepCharPositions]: (state, action) => ({...state, keepCharPositions: action.payload}),
  [actionCreators.setPlaceholderChar]: (state, action) => ({...state, placeholderChar: action.payload}),
  [actionCreators.populateFromChoice]: (state, action) => {
    const choice = find({name: action.payload})(choices)

    return {...initialState, ...choice, shouldFocusMaskedInput: true}
  },
  [actionCreators.setValue]: (state, action) => ({...state, value: action.payload})
}, initialState)

export const selectors = {
  getTextMaskComponentUniqueKey(state) {
    return JSON.stringify(pick([...textMaskProps, 'name'])(state))
  },
  getTextMaskComponentStyle(state) {
    return (state.mask.instanceOf === 'createNumberMask') ? {textAlign: 'right'} : {}
  },
  isMaskFunction(state) {
    return typeof state.mask === 'function' || (typeof state.mask === 'object' && !(state.mask instanceof Array))
  }
}

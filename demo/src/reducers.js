import {actionTypes} from './actions';
import conformToPattern from '../../src/conformToPattern.js'
import extend from 'lodash/extend'

const initialState = {
  results: '(___) ___-____'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_RESULTS:
      return extend({}, state, {results: conformToPattern(action.payload, '(111) 111-1111')})
    case actionTypes.SET_CARET_POSITION:
      return extend({}, state, {caretPosition: action.payload})
    default:
      return state;
  }
}

import {actionTypes} from './actions';
import conformToMask from '../../src/conformToMask.js'

const initialState = {
  results: '(___) ___-____'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_RESULTS:
      return {...state, results: conformToMask(action.payload, '(111) 111-1111')}
    case actionTypes.SET_CURSOR_POSITION:
      return {...state, cursorPosition: action.payload}
    default:
      return state;
  }
}

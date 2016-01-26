import {actionTypes} from './actions';

const initialState = {
  results: 2
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_RESULTS:
      return { results: state.results + 1 }
    default:
      return state;
  }
}

export const actionTypes = {
  UPDATE_RESULTS: 'UPDATE_RESULTS',
  SET_CARET_POSITION: 'SET_CARET_POSITION'
}

export const actionCreators = {
  updateResults(payload) {
    return {
      type: actionTypes.UPDATE_RESULTS,
      payload
    }
  },

  setCaretPosition(payload) {
    return {
      type: actionTypes.SET_CARET_POSITION,
      payload
    }
  }
}

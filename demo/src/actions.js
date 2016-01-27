export const actionTypes = {
  UPDATE_RESULTS: 'UPDATE_RESULTS',
  SET_CURSOR_POSITION: 'SET_CURSOR_POSITION'
}

export const actionCreators = {
  updateResults(payload) {
    return {
      type: actionTypes.UPDATE_RESULTS,
      payload
    }
  },

  setCursorPosition(payload) {
    return {
      type: actionTypes.SET_CURSOR_POSITION,
      payload
    }
  }
}

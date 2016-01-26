export const actionTypes = {
  UPDATE_RESULTS: 'UPDATE_RESULTS'
}

export const actionCreators = {
  updateResults(payload) {
    return {
      type: actionTypes.UPDATE_RESULTS,
      payload
    }
  }
}

import React, { Component } from 'react'
import { createStore } from 'redux'
import mapValues from 'lodash/fp/mapValues'

const types = {
  setMask: 'setMask',
  setGuide: 'setGuide',
  setKeepCharPositions: 'setKeepCharPositions',
  setPlaceholderChar: 'setPlaceholderChar'
}

const initialState = {
  mask: '',
  selectedChoice: 0,
  placeholderChar: '\u2000',
  guide: true,
  keepCharPositions: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return Object.assign({}, state)
  }
};

export const store = createStore(reducer)

export const actions = mapValues(
  (actionCreator, actionCreatorName) => (...args) => ({
    type: types[actionCreatorName],
    ...actionCreator(...args)
  }),
  {
    setMask(mask) {
      return {payload: mask}
    }
  }
)

export const selectors = {
  getTextMaskComponentUniqueKey(state) {
    return JSON.stringify(state.stuff)
  }
}

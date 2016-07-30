import React, { Component } from 'react'
import { createStore } from 'redux'
import mapValues from 'lodash/fp/mapValues'
import find from 'lodash/fp/find'
import pick from 'lodash/fp/pick'
import {choices} from './choices.jsx'
import {textMaskProps} from './constants.js'

export const actionPayloaders = {
  setMask(mask) { return mask },
  setGuide(guide) { return guide },
  setKeepCharPositions(keepCharPositions) { return keepCharPositions },
  setPlaceholderChar(placeholderChar) { return placeholderChar },
  populateFromChoice(choice) { return choice },
  setOnRejectMessage(message) { return message },
  setOnAcceptMessage(message) { return message }
}

const types = mapValues((actionPayloader) => actionPayloader.name)(actionPayloaders)

export const actionCreators = mapValues(
  (actionPayloader) => (...args) => ({type: actionPayloader.name, payload: actionPayloader(...args)}),
)(
  actionPayloaders
)

const initialState = {
  mask: '',
  placeholderChar: '\u2000',
  guide: true,
  keepCharPositions: false
}

const reducer = (state = {...initialState, ...choices[0]}, action) => {
  const {payload} = action

  state = {...state, shouldFocusMaskedInput: false}

  switch(action.type) {
    case types.setMask:
      return {...state, mask: payload}
    case types.setGuide:
      return {...state, guide: payload}
    case types.setKeepCharPositions:
      return {...state, keepCharPositions: payload}
    case types.setPlaceholderChar:
      return {...state, placeholderChar: payload}
    case types.populateFromChoice:
      const choice = find({name: payload})(choices)

      return {...initialState, ...choice, shouldFocusMaskedInput: true}
    case types.setOnAcceptMessage:
      return {...state, acceptanceMessage: payload}
    case types.setOnRejectMessage:
      return {...state, rejectionMessage: payload}
    default:
      return {...state}
  }
}

export const store = createStore(reducer)

export const selectors = {
  getTextMaskComponentUniqueKey(state) {
    return JSON.stringify(pick(textMaskProps)(state))
  },
  getTextMaskComponentStyle(state) {
    return (state.name === choices[5].name) ? {textAlign: 'right'} : {}
  },
  isDynamicMask(state) {
    return typeof state.mask === 'function'
  }
}

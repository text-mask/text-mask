import React from 'react'
import autoCorrectedMmddyyyyPipe from '../../addons/src/autoCorrectedMmddyyyyPipe.js'
import createNumberMask from '../../addons/src/createNumberMask'
import {placeholderChars} from './constants.js'
import map from 'lodash/fp/map'

const defaultValues = {
  placeholderChar: placeholderChars.whitespace,
  guide: true,
  pipe: null,
  keepCharPositions: false,
  onReject: null,
  onAccept: null,
  help: null
}

export default map(
  (choice) => ({...defaultValues, ...choice}),
  [{
    name: 'US phone number',
    mask: '(111) 111-1111',
    placeholder: '(555) 495-3947'
  }, {
    name: 'US phone number with country code',
    mask: '+\\1 (111) 111-1111',
    placeholder: '+1 (555) 495-3947'
  }, {
    name: 'Date',
    mask: '11/11/1111',
    placeholder: '25/09/1970'
  }, {
    name: 'Date (auto-corrected)',
    mask: '11/11/1111',
    pipe: autoCorrectedMmddyyyyPipe,
    onRejectMessage: <span>Please enter a date with the following format <code>MM/DD/YYYY</code>.</span>,
    placeholder: 'Please enter a date',
    keepCharPositions: true,
  }, {
    name: 'US dollar amount',
    mask: createNumberMask(),
    placeholder: 'Enter an amount',
  }, {
    name: 'US dollar amount (allows decimal)',
    mask: createNumberMask({allowDecimal: true}),
    placeholder: 'Enter an amount',
  }, {
    name: 'Percentage amount',
    mask: createNumberMask({suffix: '%', prefix: ''}),
    placeholder: 'Enter an amount',
  }, {
    name: 'US zip code',
    mask: '11111',
    placeholder: '94303',
    placeholderChar: placeholderChars.underscore
  }, {
    name: 'Canadian postal code',
    mask: 'U1U 1U1',
    placeholder: 'K1A 0B2',
    placeholderChar: placeholderChars.underscore
  }]
)

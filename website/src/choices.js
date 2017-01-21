import React from 'react'
import createAutoCorrectedDatePipe from '../../addons/src/createAutoCorrectedDatePipe.js'
import createNumberMask from '../../addons/src/createNumberMask.js'
import emailMask from '../../addons/src/emailMask.js'
import {placeholderChars, alphabetic, digit} from './constants.js'
import map from 'lodash/fp/map'

const defaultValues = {
  placeholderChar: placeholderChars.whitespace,
  guide: true,
  pipe: null,
  keepCharPositions: false,
  onReject: null,
  onAccept: null,
  help: null,
  placeholder: null
}

export default map(
  (choice) => ({...defaultValues, ...choice}),
  [{
    name: 'US phone number',
    mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    placeholder: '(555) 495-3947'
  }, {
    name: 'US phone number with country code',
    mask: ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    placeholder: '+1 (555) 495-3947'
  }, {
    name: 'Date',
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    placeholder: '25/09/1970'
  }, {
    name: 'Date (auto-corrected)',
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    pipe: createAutoCorrectedDatePipe(),
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
    name: 'Email',
    mask: emailMask,
    placeholder: 'john@smith.com',
    placeholderChar: placeholderChars.whitespace
  }, {
    name: 'US zip code',
    mask: [/[1-9]/, /\d/, /\d/, /\d/, /\d/],
    placeholder: '94303',
    placeholderChar: placeholderChars.underscore
  }, {
    name: 'Canadian postal code',
    mask: [alphabetic, digit, alphabetic, ' ', digit, alphabetic, digit],
    pipe: (conformedValue) => ({value: conformedValue.toUpperCase()}),
    placeholder: 'K1A 0B2',
    placeholderChar: placeholderChars.underscore
  }]
)

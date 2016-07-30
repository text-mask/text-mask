import React from 'react' // eslint-disable-line
import autoCorrectedMmddyyyyPipe from '../../addons/src/autoCorrectedMmddyyyyPipe.js'
import createCurrencyMask from '../../addons/src/createCurrencyMask'
import {placeholderChars} from './constants.js'
import map from 'lodash/fp/map'

const dynamicMaskDocumentationLink = 'https://github.com/msafi/text-mask/blob/master/' +
  'componentDocumentation.md#mask-function-aka-dynamic-mask'

const defaultValues = {
  placeholderChar: placeholderChars.whitespace,
  guide: true,
  pipe: null,
  keepCharPositions: false,
  onReject: null,
  onAccept: null,
  help: null
}

export const choices = map(
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
    name: 'Canadian postal code',
    mask: 'U1U 1U1',
    placeholder: 'K1A 0B2',
    placeholderChar: placeholderChars.underscore
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
    help: (
      <span>
        This mask is configured with
        {' '}
        <a
          className='alert-link'
          target='_blank'
          href='https://github.com/msafi/text-mask/tree/master/addons#autocorrectedmmddyyyypipe'>
          autoCorrectedMmddyyyyPipe
        </a>, which needs to be installed separately as a
        {' '}
        <a
          className='alert-link'
          target='_blank'
          href='https://github.com/msafi/text-mask/tree/master/addons/#readme'>
          Text Mask addon
        </a>.

        <br/><br/>

        It also uses the
        {' '}<a
        target='_blank'
        href='https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#onreject'
      >
          <code>onReject</code>
        </a>{' '}
        callback to show a hint message when user enters a rejected character.
      </span>
    )
  }, {
    name: 'Currency, amount, or percentage',
    mask: createCurrencyMask(),
    placeholder: 'Enter an amount',
    help: (
      <span>
        This is a
        {' '}
          <a
            className='alert-link'
            target='_blank'
            href={dynamicMaskDocumentationLink}>
            dynamic mask
          </a>,
        {' '}
        which was created with
        {' '}
        <a
          className='alert-link'
          target='_blank'
          href='https://github.com/msafi/text-mask/tree/master/addons#createcurrencymask'>
          createCurrencyMask
        </a>. It needs to be installed separately as a
        {' '}
        <a
          className='alert-link'
          target='_blank'
          href='https://github.com/msafi/text-mask/tree/master/addons/#readme'>
          Text Mask addon
        </a>.
      </span>
    ),
    style: {textAlign: 'right'}
  }, {
    name: 'Five digit number (zip code)',
    mask: '11111',
    placeholder: '94303',
    placeholderChar: placeholderChars.underscore
  }, {
    name: 'Three letter month name',
    mask: 'ULL',
    placeholder: 'Mar',
    placeholderChar: placeholderChars.underscore
  }, {
    name: 'Custom',
    mask: '',
    placeholder: undefined
  }]
)

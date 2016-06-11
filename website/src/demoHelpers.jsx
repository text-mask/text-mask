import React from 'react' // eslint-disable-line
import createMmddyyyyValidator from '../../addons/src/createMmddyyyyValidator.js'

export const initialState = {
  choices: [{
    value: 'usPhoneNumber',
    name: 'US phone number',
    mask: '(111) 111-1111',
    placeholder: '(555) 495-3947'
  }, {
    value: 'usPhoneNumberWithCountryCode',
    name: 'US phone number with country code',
    mask: '+\\1 (111) 111-1111',
    placeholder: '+1 (555) 495-3947'
  }, {
    value: 'canadianPostalCode',
    name: 'Canadian postal code',
    mask: 'U1U 1U1',
    placeholder: 'K1A 0B2'
  }, {
    value: 'date',
    name: 'Date (not validated)',
    mask: '11/11/1111',
    placeholder: '25/09/1970'
  }, {
    value: 'birthDay',
    name: 'Birth day (validated)',
    mask: '11/11/1111',
    validator: createMmddyyyyValidator({
      minimumDate: '01/01/1900',
      maximumDate: (new Date()).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }),
    placeholder: 'Date between 01/01/1900 and today',
    help: (
      <span>
        This mask is validated with
        {' '}
        <a
          className='alert-link'
          target='_blank'
          href='https://github.com/msafi/text-mask/blob/master/addons/src/createMmddyyyyValidator.js'>
          createMmddyyyyValidator
        </a>, which needs to be installed separately as a
        {' '}
        <a
          className='alert-link'
          target='_blank'
          href='https://github.com/msafi/text-mask/tree/master/addons/#readme'>
          Text Mask addon
        </a>.
      </span>
    )
  }, {
    value: 'fiveDigitNumber',
    name: 'Five digit number (zip code)',
    mask: '11111',
    placeholder: '94303'
  }, {
    value: 'threeLetterMonth',
    name: 'Three letter month name',
    mask: 'ULL',
    placeholder: 'Mar'
  }, {
    value: 'custom',
    name: 'Custom',
    mask: '',
    placeholder: undefined
  }],

  selectedChoice: 0,

  placeholderChar: '_',

  guide: false,
}

const githubLink = 'https://github.com/msafi/text-mask/#readme'

export const DemoTop = () => (
  <div>
    <p>
      <img
        src='./assets/logo.png'
        alt='Text Mask'
        className='img-responsive'
        width='331'
        height='67'/>
    </p>

    <p>
      This is just a demo. Try filling out the masked input field.
      Try entering bad characters. Pasting. Deleting.
      Or using auto-fill. Try it on mobile too.
    </p>
  </div>
)

export const DemoBottom = () => (
  <p>
    For more information about
    installation, usage, and documentation, see the <a href={githubLink}>GitHub page</a>.
  </p>
)

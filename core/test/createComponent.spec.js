import testParameters, {
  noGuideMode,
  acceptedCharInMask,
  allowMaskingCharInMask
} from './../../common/testParameters.js'
import packageJson from '../package.json'

const createInputElementTextMask = (isVerify()) ?
  require(`../${packageJson.main}`).createInputElementTextMask :
  require('../src/createInputElementTextMask.js').default

describe('createInputElementTextMask', () => {
  it('manages')
})

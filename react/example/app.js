import React from 'react'
import MaskedInput from '../src/reactTextMask'
import createAutoCorrectedTimePipe from '../../addons/src/createAutoCorrectedTimePipe';
const autoCorrectedTimePipe = createAutoCorrectedTimePipe('hh:mm:ss')

export default () => (
  <form className='form-horizontal'>
    <div className='form-group'>
      <label htmlFor='1' className='col-sm-2 control-label'>Masked input</label>

      <div className='col-sm-10'>
        <MaskedInput
          mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
          className='form-control'
          id='1'
          type='text'
          keepCharPositions={true}
          pipe={autoCorrectedTimePipe}
        />
      </div>
    </div>
  </form>
)

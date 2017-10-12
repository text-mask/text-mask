import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import packageJson from '../package.json'

const ReactTextMask = (isVerify()) ?
  require(`../${packageJson.main}`) :
  require('../src/reactTextMask.js')

const MaskedInput = ReactTextMask.default
const conformToMask = ReactTextMask.conformToMask

const emailMask = (isVerify()) ?
  require('../../addons/dist/emailMask.js').default :
  require('../../addons/src/emailMask.js').default

describe('MaskedInput', () => {
  it('does not throw when instantiated', () => {
    expect(() => ReactTestUtils.renderIntoDocument(
      <MaskedInput
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      guide={true}/>
    )).not.to.throw()
  })

  it('renders a single input element', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      guide={true}/>
    )

    expect(
      () => ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    ).not.to.throw()
  })

  it('renders correctly with an undefined value', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    expect(renderedDOMComponent.value).to.equal('')
  })

  it('renders correctly with an initial value', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
        value='123'
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    expect(renderedDOMComponent.value).to.equal('(123) ___-____')
  })

  it('renders mask instead of empty string when showMask is true', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
        showMask={true}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    expect(renderedDOMComponent.value).to.equal('(___) ___-____')
  })

  it('does not render mask instead of empty string when showMask is false', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
        showMask={false}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    expect(renderedDOMComponent.value).to.equal('')
  })

  it('calls createTextMaskInputElement with the correct config', () => {
    const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    const guide = true
    const placeholderChar = '*'
    const keepCharPositions = true
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      mask={mask}
      guide={guide}
      placeholderChar={placeholderChar}
      keepCharPositions={keepCharPositions}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

    // stub the createTextMaskInputElement method
    maskedInput.createTextMaskInputElement = (config) => {
      expect(typeof config).to.equal('object')
      expect(config.inputElement).to.equal(renderedDOMComponent)
      expect(config.mask).to.equal(mask)
      expect(config.guide).to.equal(guide)
      expect(config.placeholderChar).to.equal(placeholderChar)
      expect(config.keepCharPositions).to.equal(keepCharPositions)
      return {
        update() {}
      }
    }
    maskedInput.initTextMask()
  })

  it('sets textMaskInputElement and calls textMaskInputElement.update with the correct value', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      value='123'
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    )

    // stub the createTextMaskInputElement method
    maskedInput.createTextMaskInputElement = () => {
      return {
        update(value) {
          expect(value).to.equal('123')
        }
      }
    }
    maskedInput.initTextMask()
    expect(typeof maskedInput.textMaskInputElement).to.equal('object')
  })

  it('initializes textMaskInputElement property', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      guide={true}/>
    )
    expect(typeof maskedInput.textMaskInputElement).to.equal('object')
    expect(typeof maskedInput.textMaskInputElement.state).to.equal('object')
    expect(typeof maskedInput.textMaskInputElement.state.previousConformedValue).to.equal('string')
    expect(typeof maskedInput.textMaskInputElement.update).to.equal('function')
  })

  it('does not render masked characters', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      value='abc'
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      guide={true}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    expect(renderedDOMComponent.value).to.equal('')
  })

  it('does not allow masked characters', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      guide={true}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

    expect(renderedDOMComponent.value).to.equal('')
    maskedInput.textMaskInputElement.update('abc')
    expect(renderedDOMComponent.value).to.equal('')
  })

  it('can be disabled by setting the mask to false', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      value='123abc'
      mask={false}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    expect(renderedDOMComponent.value).to.equal('123abc')
  })

  it('can call textMaskInputElement.update to update the inputElement.value', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

    expect(renderedDOMComponent.value).to.equal('')

    renderedDOMComponent.value = '12345'
    maskedInput.textMaskInputElement.update()
    expect(renderedDOMComponent.value).to.equal('(123) 45_-____')
  })

  it('can pass value to textMaskInputElement.update method', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      value='123'
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

    expect(renderedDOMComponent.value).to.equal('(123) ___-____')
    maskedInput.textMaskInputElement.update('1234')
    expect(renderedDOMComponent.value).to.equal('(123) 4__-____')
  })

  it('can pass textMaskConfig to textMaskInputElement.update method', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      value='123'
      mask={false}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

    expect(renderedDOMComponent.value).to.equal('123')

    maskedInput.textMaskInputElement.update('1234', {
      inputElement: renderedDOMComponent,
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(renderedDOMComponent.value).to.equal('(123) 4__-____')
  })

  it('accepts function as mask property', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      value='1234'
      mask={(value) => {
        expect(value).to.equal('1234')
        return ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      }}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    expect(renderedDOMComponent.value).to.equal('(123) 4__-____')
  })

  it('accepts object as mask property', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      value='abc'
      mask={emailMask}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    expect(renderedDOMComponent.value).to.equal('abc@ .')
  })

  it('accepts pipe function', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
      value='1234'
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      pipe={(value) => {
        expect(value).to.equal('(123) 4__-____')
        return 'abc'
      }}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    expect(renderedDOMComponent.value).to.equal('abc')
  })

  it('calls textMaskInputElement.update and props.onChange when a change event is received', () => {
    const onChangeSpy = sinon.spy((event) => {
      expect(event.target.value).to.equal('123')
    })
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
        value='123'
        onChange={onChangeSpy}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    maskedInput.textMaskInputElement.update = sinon.spy(() => {})
    ReactTestUtils.Simulate.change(renderedDOMComponent, {target: {value: '123'}})
    expect(onChangeSpy.callCount).to.equal(1)
    expect(maskedInput.textMaskInputElement.update.callCount).to.equal(1)
  })

  it('calls textMaskInputElement.update when an input event is received when props.onChange is not set', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
        value='123'
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}/>
    )
    const renderedDOMComponent = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    maskedInput.textMaskInputElement.update = sinon.spy(() => {})

    ReactTestUtils.Simulate.change(renderedDOMComponent, {target: {value: '456'}})
    expect(maskedInput.textMaskInputElement.update.callCount).to.equal(1)
  })

  it('calls textMaskInputElement.update via onChange method', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput
        value='123'
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={true}/>
    )
    maskedInput.textMaskInputElement.update = sinon.spy(() => {})
    maskedInput.onChange()
    expect(maskedInput.textMaskInputElement.update.callCount).to.equal(1)
  })
})

describe('conformToMask', () => {
  it('is a function', () => {
    expect(typeof conformToMask).to.equal('function')
  })
})
